"use client"

import React, { useEffect, useState } from 'react';
import PaginaProductos from '@/componentes/PaginaProductos';
import PaginaClientes from '@/componentes/PaginaClientes';
import PaginaCarrito from '@/componentes/PaginaCarrito';
import PaginaOrdenes from '@/componentes/PaginaOrdenes';
import ModalProducto from '@/componentes/ModalProducto';
import ModalCliente from '@/componentes/ModalCliente';
import { useCarrito } from '@/hooks/useCarrito';
import { useClientes } from '@/hooks/useClientes';
import { useOrdenes } from '@/hooks/useOrdenes';
import { useProductos } from '@/hooks/useProductos';
import { useMensaje } from '@/hooks/useMensaje';
import { Producto } from '@/modelo/producto';
import { Cliente } from '@/modelo/cliente';
import { Carrito } from '@/modelo/carrito';


export default function Home() {
  const [paginaActual, setPaginaActual] = useState<'productos' | 'clientes' | 'carrito' | 'ordenes'>('productos');

  const { mensaje } = useMensaje();
  const productosHook = useProductos();
  const clientesHook = useClientes();
  const carritoHook = useCarrito();
  const ordenesHook = useOrdenes();

  const cargando = productosHook.cargando || clientesHook.cargando || ordenesHook.cargando;
  const carrito = carritoHook.carrito;

  useEffect(() => {
    const manejarActualizacionCarrito = (event: CustomEvent) => {
        carritoHook.setCarrito(event.detail);
    };

    window.addEventListener("actualizar-carrito", manejarActualizacionCarrito as EventListener);

    return () => {
        window.removeEventListener("actualizar-carrito", manejarActualizacionCarrito as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">      
      {mensaje.text && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50
          ${mensaje.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {mensaje.text}
        </div>
      )}

      {cargando && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-white text-lg">Cargando...</p>
        </div>
      )}

      <nav className="bg-gray-800 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold rounded-lg">Mi Tienda Virtual</div>
          <div className="flex space-x-6">
            <button
              onClick={() => setPaginaActual('productos')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'productos' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Productos
            </button>
            <button
              onClick={() => setPaginaActual('clientes')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'clientes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Clientes
            </button>
            <button
              onClick={() => setPaginaActual('carrito')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out relative
                ${paginaActual === 'carrito' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Carrito
              {carrito?.items && carrito.items.length > 0 && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carrito.items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setPaginaActual('ordenes')}
              className={`px-4 py-2 rounded-md transition duration-300 ease-in-out
                ${paginaActual === 'ordenes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              Órdenes
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {paginaActual === 'productos' && (
          <PaginaProductos
            productos={productosHook.productos}
            agregarAlCarrito={carritoHook.agregarAlCarrito}
            quitarProducto={productosHook.eliminarProducto}
            setMostrarModalProducto={productosHook.setMostrarProductoModal}
            setProductoSeleccionado={productosHook.setProductoSeleccionado}
          />
        )}

        {paginaActual === 'clientes' && (
          <PaginaClientes
            clientes={clientesHook.clientes}
            setClienteSeleccionado={clientesHook.setClienteSeleccionado}
            setMostrarModalCliente={clientesHook.setMostrarModalCliente}
            eliminarCliente={clientesHook.eliminarCliente}
          />
        )}

        {paginaActual === 'carrito' && (
          <PaginaCarrito
            carrito={carritoHook.carrito}
            setCarrito={carritoHook.setCarrito}
            actualizarCantidadProducto={carritoHook.actualizarCantidadEnCarrito}
            quitarProducto={carritoHook.eliminarDelCarrito}
            crearOrden={() => ordenesHook.realizarPedido(carritoHook.carrito, () => carritoHook.setCarrito({} as Carrito))}
          />
        )}

        {paginaActual === 'ordenes' && (
          <PaginaOrdenes
            ordenes={ordenesHook.ordenes}
            clientes={clientesHook.clientes}
            obtenerPedidos={ordenesHook.obtenerPedidos}
          />
        )}
      </main>

      {productosHook.mostrarModalProducto && (
        <ModalProducto
          producto={productosHook.productoSeleccionado}
          cerrar={() => {
            productosHook.setMostrarProductoModal(false);
            productosHook.setProductoSeleccionado(null);
          }}
          grabar={(producto) =>
            productosHook.productoSeleccionado
              ? productosHook.actualizarProducto(producto as Producto)
              : productosHook.agregarProducto(producto as Omit<Producto, 'id'>)
          }
        />
      )}

      {clientesHook.mostrarModalCliente && (
        <ModalCliente
          cliente={clientesHook.clienteSeleccionado}
          cerrar={() => {
            clientesHook.setMostrarModalCliente(false);
            clientesHook.setClienteSeleccionado(null);
          }}
          grabar={(cliente) =>
            clientesHook.clienteSeleccionado
              ? clientesHook.actualizarCliente(cliente as Cliente)
              : clientesHook.registrarCliente(cliente as Omit<Cliente, 'id'>)
          }
        />
      )}
    </div>
  );
};
