"use client";

import { Carrito } from "@/modelo/carrito";
import { Cliente } from "@/modelo/cliente";
import { useEffect, useState } from "react";
import { getClientes } from "@/lib/api/clientes";
import { getCarritoPorCliente, crearCarrito } from "@/lib/api/carrito";

interface PaginaCarritoProps {
    carrito: Carrito;
    setCarrito: (carrito: Carrito) => void;
    actualizarCantidadProducto: (idProducto: number, cantidad: number) => void;
    quitarProducto: (idProducto: number) => void;
    crearOrden: () => Promise<void>;
}

const CartsPage: React.FC<PaginaCarritoProps> = ({ carrito, setCarrito, actualizarCantidadProducto, quitarProducto, crearOrden }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const lista = await getClientes();
                setClientes(lista);
            } catch (error) {
                console.error("Error al cargar clientes", error);
            }
        };

        cargarClientes();
    }, []);

    const manejarSeleccionCliente = async (clienteId: number) => {
        const cliente = clientes.find(c => c.id === clienteId);
        if (!cliente) return;

        setClienteSeleccionado(cliente);

        try {
            let carritoCliente = await getCarritoPorCliente(cliente.id);

            if (!carritoCliente) {
                carritoCliente = await crearCarrito({
                    id: 0,
                    nombre: `Carrito de ${cliente.nombre}`,
                    fecha: new Date(),
                    cliente,
                    items: []
                });
            }

            setCarrito({...carritoCliente});
        } catch (error) {
            console.error("Error al traer o crear el carrito", error);
        }
    };

    useEffect(() => {
        if (carrito && carrito.cliente) {
            setClienteSeleccionado(carrito.cliente);
        }
    }, [carrito]);

    const totalCarrito = carrito.items?.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tu Carrito</h1>

        <div className="mb-6">
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-2">Selecciona un cliente:</label>
            <select
                id="cliente"
                value={clienteSeleccionado?.id ?? ""}
                onChange={(e) => manejarSeleccionCliente(parseInt(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">-- Selecciona un cliente --</option>
                {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre} {cliente.apellidos} - {cliente.dni}
                    </option>
                ))}
            </select>
        </div>

        {carrito.items?.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío. Agrega algunos productos!</p>
        ) : (
            <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {carrito.items?.map((item) => (
                    <tr key={item.producto.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.producto.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.producto.precio.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => actualizarCantidadProducto(item.producto.id, parseInt(e.target.value))}
                            className="w-20 border border-gray-300 rounded-md p-1 text-center"
                        />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(item.producto.precio * item.cantidad).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                            onClick={() => quitarProducto(item.producto.id)}
                            className="text-red-600 hover:text-red-900"
                        >
                            Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="flex justify-end items-center mt-6 p-4 bg-gray-50 rounded-lg">
                <span className="text-xl font-bold text-gray-800 mr-4">Total: ${totalCarrito?.toFixed(2) ?? 0.00}</span>
                <button
                onClick={crearOrden}
                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
                >
                Crear Órden
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default CartsPage;