use inf13;

INSERT INTO PRODUCTO (codigo, nombre, descripcion, precio, stock) VALUES
('P000000001', 'Laptop Pro', 'Laptop de alto rendimiento', 3500.00, 15),
('P000000002', 'Smartphone X', 'Teléfono inteligente de última generación', 1200.00, 50),
('P000000003', 'Tablet S', 'Tablet ligera y potente', 800.00, 30),
('P000000004', 'Auriculares BT', 'Auriculares Bluetooth con cancelación de ruido', 300.00, 40),
('P000000005', 'Monitor 27"', 'Monitor LED 27 pulgadas 4K', 1000.00, 20),
('P000000006', 'Teclado Mecánico', 'Teclado con switches mecánicos RGB', 250.00, 25),
('P000000007', 'Mouse Gaming', 'Mouse ergonómico para gaming', 150.00, 35),
('P000000008', 'Cámara Web HD', 'Cámara web Full HD para videollamadas', 200.00, 10),
('P000000009', 'Disco SSD 1TB', 'Unidad SSD de 1TB alta velocidad', 500.00, 40),
('P000000010', 'Impresora WiFi', 'Impresora inalámbrica multifunción', 450.00, 12);

INSERT INTO CLIENTE (dni, nombre, apellidos) VALUES
('12345678', 'Carlos', 'Ramírez Gómez'),
('23456789', 'María', 'Lopez Díaz'),
('34567890', 'Juan', 'Pérez Torres'),
('45678901', 'Ana', 'Fernández Ruiz'),
('56789012', 'Luis', 'Sánchez Morales');

INSERT INTO CARRITO (idCliente, nombre, fecha) VALUES
(1, 'Carrito Carlos', '2024-06-24'),
(2, 'Carrito María', '2024-06-24'),
(3, 'Carrito Juan', '2024-06-24'),
(4, 'Carrito Ana', '2024-06-24'),
(5, 'Carrito Luis', '2024-06-24');

-- Carrito 1
INSERT INTO ITEMCARRITO (idCarrito, idProducto, cantidad, subTotal) VALUES
(1, 1, 1, 3500.00),
(1, 4, 2, 600.00),
(1, 7, 1, 150.00);

-- Carrito 2
INSERT INTO ITEMCARRITO (idCarrito, idProducto, cantidad, subTotal) VALUES
(2, 2, 1, 1200.00),
(2, 6, 1, 250.00),
(2, 9, 2, 1000.00);

-- Carrito 3
INSERT INTO ITEMCARRITO (idCarrito, idProducto, cantidad, subTotal) VALUES
(3, 3, 1, 800.00),
(3, 5, 1, 1000.00);

-- Carrito 4
INSERT INTO ITEMCARRITO (idCarrito, idProducto, cantidad, subTotal) VALUES
(4, 8, 1, 200.00),
(4, 10, 1, 450.00),
(4, 4, 2, 600.00);

-- Carrito 5
INSERT INTO ITEMCARRITO (idCarrito, idProducto, cantidad, subTotal) VALUES
(5, 1, 1, 3500.00),
(5, 9, 1, 500.00);

-- Order for Carrito 1
INSERT INTO ORDEN (numero, idCarrito, fecha, subTotal, igv, total) VALUES
('ORD000001', 1, '2024-06-24', 4250.00, 765.00, 5015.00);

-- Order for Carrito 2
INSERT INTO ORDEN (numero, idCarrito, fecha, subTotal, igv, total) VALUES
('ORD000002', 2, '2024-06-24', 2450.00, 441.00, 2891.00);

-- Order for Carrito 3
INSERT INTO ORDEN (numero, idCarrito, fecha, subTotal, igv, total) VALUES
('ORD000003', 3, '2024-06-24', 1800.00, 324.00, 2124.00);

-- Order for Carrito 4
INSERT INTO ORDEN (numero, idCarrito, fecha, subTotal, igv, total) VALUES
('ORD000004', 4, '2024-06-24', 1250.00, 225.00, 1475.00);

-- Order for Carrito 5
INSERT INTO ORDEN (numero, idCarrito, fecha, subTotal, igv, total) VALUES
('ORD000005', 5, '2024-06-24', 4000.00, 720.00, 4720.00);

-- Order 1
INSERT INTO ITEMORDEN (idOrden, idProducto, cantidad, subTotal) VALUES
(1, 1, 1, 3500.00),
(1, 4, 2, 600.00),
(1, 7, 1, 150.00);

-- Order 2
INSERT INTO ITEMORDEN (idOrden, idProducto, cantidad, subTotal) VALUES
(2, 2, 1, 1200.00),
(2, 6, 1, 250.00),
(2, 9, 2, 1000.00);

-- Order 3
INSERT INTO ITEMORDEN (idOrden, idProducto, cantidad, subTotal) VALUES
(3, 3, 1, 800.00),
(3, 5, 1, 1000.00);

-- Order 4
INSERT INTO ITEMORDEN (idOrden, idProducto, cantidad, subTotal) VALUES
(4, 8, 1, 200.00),
(4, 10, 1, 450.00),
(4, 4, 2, 600.00);

-- Order 5
INSERT INTO ITEMORDEN (idOrden, idProducto, cantidad, subTotal) VALUES
(5, 1, 1, 3500.00),
(5, 9, 1, 500.00);
