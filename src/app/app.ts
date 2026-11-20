import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from './services/producto';
import { Producto } from './models/producto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private productoService = inject(ProductoService);
  private fb = inject(FormBuilder);

  productos = signal<Producto[]>([]);
  productoEditandoId = signal<string | null>(null);
  mensajeError = signal<string>('');
  mensajeExito = signal<string>('');
  cargando = signal<boolean>(false);

productoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    categoria: ['', [Validators.required, Validators.pattern(/\S/)]],
    precio: [null as number | null, [Validators.required, Validators.min(0)]],
    stock: [null as number | null, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]]
  });

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    this.cargando.set(true);
    this.mensajeError.set('');
    try {
      const lista = await this.productoService.obtenerProductos();
      this.productos.set(lista);
    } catch (error) {
      this.mensajeError.set('Error al cargar los productos desde Firestore. Verifica tu conexión o reglas de seguridad.');
      console.error(error);
    } finally {
      this.cargando.set(false);
    }
  }

  async guardarProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.mensajeError.set('');
    this.mensajeExito.set('');
    const datosProducto = this.productoForm.value as Producto;

    try {
      const idEditar = this.productoEditandoId();
      if (idEditar) {
        await this.productoService.actualizarProducto(idEditar, datosProducto);
        this.mensajeExito.set('Producto actualizado correctamente.');
      } else {
        await this.productoService.agregarProducto(datosProducto);
        this.mensajeExito.set('Producto creado correctamente.');
      }
      this.cancelarEdicion();
      await this.cargarProductos();
    } catch (error) {
      this.mensajeError.set('Ocurrió un error al guardar el producto en la base de datos.');
      console.error(error);
    }
  }

  seleccionarParaEditar(producto: Producto) {
    this.productoEditandoId.set(producto.id || null);
    this.mensajeError.set('');
    this.mensajeExito.set('');
    this.productoForm.patchValue({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: producto.precio,
      stock: producto.stock
    });
  }

  cancelarEdicion() {
    this.productoEditandoId.set(null);
    this.productoForm.reset();
  }

  async eliminarProducto(producto: Producto) {
    if (!producto.id) return;

    const confirmado = window.confirm(`¿Estás segura de eliminar el producto "${producto.nombre}"?`);
    if (!confirmado) return;

    this.mensajeError.set('');
    this.mensajeExito.set('');
    try {
      await this.productoService.eliminarProducto(producto.id);
      this.mensajeExito.set('Producto eliminado correctamente.');
      if (this.productoEditandoId() === producto.id) {
        this.cancelarEdicion();
      }
      await this.cargarProductos();
    } catch (error) {
      this.mensajeError.set('Error al eliminar el producto.');
      console.error(error);
    }
  }
}