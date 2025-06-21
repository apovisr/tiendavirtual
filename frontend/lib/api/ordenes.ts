import { ItemOrden } from "@/modelo/itemOrden";
import { Orden } from "@/modelo/orden";


export async function realizarPedido(orden: Omit<Orden, 'id' | 'numero' | 'items'> & {
    items: Omit<ItemOrden, 'id' | 'orden'>[]
  }): Promise<Orden> {
    void orden;
    return {} as Orden;
}
