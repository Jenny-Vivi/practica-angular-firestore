import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);
  private productosRef = collection(this.db, 'productos');

  async obtenerProductos(): Promise<Producto[]> {
    const snapshot = await getDocs(this.productosRef);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    } as Producto));
  }

  async agregarProducto(producto: Producto) {
    const { id, ...datosSinId } = producto;
    return await addDoc(this.productosRef, datosSinId);
  }

  async actualizarProducto(id: string, datos: Partial<Producto>) {
    const { id: _, ...datosLimpios } = datos;
    const docRef = doc(this.db, 'productos', id);
    return await updateDoc(docRef, datosLimpios);
  }

  async eliminarProducto(id: string) {
    const docRef = doc(this.db, 'productos', id);
    return await deleteDoc(docRef);
  }
}