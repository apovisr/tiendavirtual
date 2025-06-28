import { ItemOrden } from "@/modelo/itemOrden";
import { Orden } from "@/modelo/orden";


export async function listarPedidos(): Promise<Orden[]> {
    const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
    if (!baseUrl) {
        throw new Error('La URL base de la API no está definida');
    }

    const response = await fetch(`${baseUrl}/ordenes`);

    if (!response.ok) {
        throw new Error(`Error al listar los pedidos: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function realizarPedido(
    orden: Omit<Orden, 'id' | 'numero' | 'items'> & {
    items: Omit<ItemOrden, 'id' | 'orden'>[]}): Promise<Orden> 
{
  const baseUrl = process.env.NEXT_PUBLIC_URL_BASE_API;
  if (!baseUrl) {
      throw new Error('La URL base de la API no está definida');
  }

  const payload = {
    ...orden,
    items: orden.items
  };

  const response = await fetch(`${baseUrl}/ordenes`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Error al realizar el pedido: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
