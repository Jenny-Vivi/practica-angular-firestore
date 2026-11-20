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
```
## Configuración de Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/) y habilitar **Cloud Firestore** con la colección `productos`.
2. Registrar una aplicación web en el proyecto para obtener el objeto `firebaseConfig`.
3. Crear el archivo `src/environments/environment.ts` (excluido de Git por seguridad) con la siguiente estructura:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_AUTH_DOMAIN',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_STORAGE_BUCKET',
    messagingSenderId: 'TU_MESSAGING_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

## Instalación y Ejecución Local

1. Clonar el repositorio e ingresar a la carpeta:
   ```bash
   git clone https://github.com/Jenny-Vivi/practica-angular-firestore.git
   cd practica-angular-firestore
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar `src/environments/environment.ts` según la sección anterior y levantar el servidor local:
   ```bash
   ng serve
   ```
4. Abrir `http://localhost:4200/` en el navegador.

## Despliegue en Vercel

[https://practica-angular-firestore.vercel.app](https://practica-angular-firestore.vercel.app)