import { Carrito } from "@/modelo/carrito";
import { ItemCarrito } from "@/modelo/itemCarrito";


export async function getCarritos(): Promise<Carrito[]> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/carritos`);
    if (!response.ok) {
        throw new Error("Error fetching carritos");
    }

    return response.json();
}

export async function getCarritoPorId(id: number): Promise<Carrito> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/carritos/${id}`);
    if (!response.ok) {
        throw new Error(`Error al traer el carrito: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
}

export async function getCarritoPorCliente(clienteId: number): Promise<Carrito | undefined> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }
  
    const response = await fetch(`${baseUrl}/carritos/cliente/${clienteId}`);
    if (!response.ok) {
        throw new Error(`Error al traer el carrito: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    if (Array.isArray(data)) {
        return data.length > 0 ? data[0] : undefined;
    }

    return data;
}

export async function crearCarrito(carrito: Carrito): Promise<Carrito> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/carritos`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(carrito)
    });
    
    if (!response.ok) {
        throw new Error(`Error al crear el carrito: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function agregarItemAlCarrito(nuevoItem: Omit<ItemCarrito, 'id'>): Promise<Carrito> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const carrito = await getCarritoPorId(nuevoItem.carrito.id);
    if (!carrito) {
        throw new Error(`El carrito con ID ${nuevoItem.carrito.id} no existe`);
    }

    const updatedCarrito: Carrito = {
        ...carrito,
        items: [...(carrito.items || []), { ...nuevoItem, id: Date.now() }] // ID temporal, si es necesario, el backend ignora
    };

    return actualizarCarrito(updatedCarrito.id, updatedCarrito);
}

export async function actualizarItemCarrito(item: ItemCarrito): Promise<Carrito> {
    const carrito = await getCarritoPorId(item.carrito.id);
    if (!carrito) {
        throw new Error(`El carrito con ID ${item.carrito.id} no existe`);
    }

    const updatedItems = carrito.items?.map(i => i.id === item.id ? item : i) || [];
    const updatedCarrito: Carrito = { ...carrito, items: updatedItems };

    return actualizarCarrito(updatedCarrito.id, updatedCarrito);
}

export async function eliminarItemDelCarrito(itemId: number, carritoId: number): Promise<Carrito> {
    const carrito = await getCarritoPorId(carritoId);
    if (!carrito) {
        throw new Error(`El carrito con ID ${carritoId} no existe`);
    }

    const updatedItems = carrito.items?.filter(i => i.id !== itemId) || [];
    const updatedCarrito: Carrito = { ...carrito, items: updatedItems };

    return actualizarCarrito(updatedCarrito.id, updatedCarrito);
}

export async function actualizarCarrito(id: number, carrito: Carrito): Promise<Carrito> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/carritos/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(carrito)
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar el carrito: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function eliminarCarrito(id: number): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/carritos/${id}`, { 
        method: "DELETE" 
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar el carrito: ${response.status} ${response.statusText}`);
    }
}
