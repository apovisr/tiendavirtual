"use client";

import { useState } from 'react';
import * as ordenessApi from '@/lib/api/ordenes';
import { useMensaje } from '@/hooks/useMensaje';
import { Carrito } from '@/modelo/carrito';
import { Orden } from '@/modelo/orden';
import { ItemOrden } from '@/modelo/itemOrden';

export function useOrdenes() {
    const [ordenes, setOrdenes] = useState<Orden[]>([]);
    const [cargando, setCargando] = useState(false);
    const { mostrarMensaje } = useMensaje();

    const realizarPedido = async (carrito: Carrito, limpiarCarrito: () => void) => {
        if (!carrito.items || carrito.items.length === 0) {
            mostrarMensaje('El carrito está vacío. Agrega productos antes de realizar el pedido.', 'error');
            return;
        }

        setCargando(true);
        try {
            const subTotal = carrito.items.reduce((sum, item) => sum + item.subTotal, 0);
            const igv = subTotal * 0.18;
            const total = subTotal + igv;

            const nuevaOrdenPayload: Omit<Orden, 'id' | 'numero' | 'items'> & {
                items: Omit<ItemOrden, 'id' | 'orden'>[]
            } = {
                carrito,
                fecha: new Date(),
                subTotal,
                igv,
                total,
                items: carrito.items.map(item => ({
                    producto: item.producto,
                    cantidad: item.cantidad,
                    subTotal: item.subTotal
                }))
            };

            const nuevaOrden = await ordenessApi.realizarPedido(nuevaOrdenPayload);

            setOrdenes(prev => [...prev, nuevaOrden]);
            limpiarCarrito();
            mostrarMensaje('¡Pedido realizado con éxito!', 'success');
        } catch (error) {
            mostrarMensaje('No se pudo realizar el pedido.', 'error');
            console.error("Error al realizar el pedido:", error);
        } finally {
            setCargando(false);
        }
    };

    const obtenerPedidos = async () => {
        setCargando(true);
        try {
            const lista = await ordenessApi.listarPedidos();
            setOrdenes(lista);
        } catch (error) {
            mostrarMensaje('No se pudieron cargar los pedidos.', 'error');
            console.error("Error al cargar los pedidos:", error);
        } finally {
            setCargando(false);
        }
    };

    return {
        ordenes, 
        realizarPedido, 
        obtenerPedidos,
        cargando
    }
}
