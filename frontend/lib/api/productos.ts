import { Producto } from "@/modelo/producto";

export async function getProductos(): Promise<Producto[]> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
  if (!baseUrl) {
    throw new Error('La URL base de la API no está definida');
  }

  const response =  await fetch(`${baseUrl}/productos`);
  return await response.json();
}

export async function agregarProducto(producto: Omit<Producto, 'id'>): Promise<Producto> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
  if (!baseUrl) {
    throw new Error('La URL base de la API no está definida');
  }

  const response = await fetch(`${baseUrl}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  });

  if (!response.ok) {
    throw new Error(`Error al agregar producto: ${response.status} ${response.statusText}`);
  }

  const nuevoProducto: Producto = await response.json();
  return nuevoProducto;
}

export async function actualizarProducto(productoActualizado: Producto): Promise<Producto> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;

  if (!baseUrl) {
    throw new Error('La URL base de la API no está definida');
  }

  const response = await fetch(`${baseUrl}/productos/${productoActualizado.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productoActualizado)
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar producto: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function eliminarProducto(id: number): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;

  if (!baseUrl) {
    throw new Error('La URL base de la API no está definida');
  }

  const response = await fetch(`${baseUrl}/productos/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar producto: ${response.status} ${response.statusText}`);
  }
}
