import { Cliente } from "@/modelo/cliente";


export async function getClientes(): Promise<Cliente[]> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response =  await fetch(`${baseUrl}/clientes`);
    return await response.json();
}

export async function registrarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });

    
    if (!response.ok) {
        throw new Error(`Error al agregar cliente: ${response.status} ${response.statusText}`);
    }

    const nuevoCliente: Cliente = await response.json();
    return nuevoCliente;
}

export async function actualizarCliente(clienteActualizado: Cliente): Promise<Cliente> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/clientes/${clienteActualizado.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteActualizado)
    });

    if (!response.ok) {
        throw new Error(`Error al actualizar cliente: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

export async function eliminarCliente(id: number): Promise<void> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;

    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/clientes/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error al eliminar cliente: ${response.status} ${response.statusText}`);
    }
}
