# Gestión de Productos — Angular + Cloud Firestore

Aplicación web CRUD desarrollada con **Angular** conectada a **Firebase Cloud Firestore** para la administración persistente de productos.

## Funciones del CRUD Implementadas

- **Crear (`agregarProducto`):** Registra un nuevo producto desde un formulario reactivo validado y lo almacena como un documento nuevo en la colección `productos` de Cloud Firestore.
- **Consultar (`obtenerProductos`):** Recupera todos los documentos de la colección `productos` al cargar la aplicación y tras cada operación de escritura, mostrando sus campos en una tabla HTML.
- **Actualizar (`actualizarProducto`):** Carga los datos del producto seleccionado en el formulario y guarda los cambios en el mismo documento de Firestore conservando su identificador (`id`).
- **Eliminar (`eliminarProducto`):** Solicita confirmación al usuario antes de eliminar el documento seleccionado; si el usuario cancela, el producto se conserva.

## Modelo de Producto

Definido en `src/app/models/producto.ts`:

```typescript
export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}