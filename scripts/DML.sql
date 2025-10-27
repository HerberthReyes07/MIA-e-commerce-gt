-- =====================================================
-- E-COMMERCE GT - DATOS INICIALES (DML)
-- =====================================================
\c ecommerce_db;

-- Habilitar extensión para encriptación de contraseñas
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =====================================================
-- 1. INSERTAR ROLES
-- =====================================================

INSERT INTO user_roles (name, description) VALUES 
('customer', 'Cliente - Usuario que ingresa en el sistema y tiene la capacidad de poner en venta algún artículo, así como también puede comprar diferentes artículos.'),
('moderator', 'Moderador - Usuario que tiene la capacidad de revisar, aceptar y/o rechazar los productos que se quieran vender.'),
('logistics', 'Logística - Usuario que tiene la capacidad de llevar un control de los paquetes que estén en curso de ser entregados.'),
('admin', 'Administrador - Usuario que tiene la capacidad de registrar empleados y administradores nuevos, además, también tiene la capacidad de generar reportes, entre otras funcionalidades.');

-- =====================================================
-- 2. INSERTAR USUARIOS
-- =====================================================

-- 1 Administrador (ya existe según tu ejemplo)
INSERT INTO users (first_name, last_name, email, password, phone, registration_date, role_id) VALUES 
('Julian', 'Reyes', 'jr.admin@ecgt.com', crypt('admin123', gen_salt('bf', 10)), '1234-5678', CURRENT_DATE, 4);

-- 5 Moderadores
INSERT INTO users (first_name, last_name, email, password, phone, registration_date, role_id) VALUES 
('Carlos', 'Mendoza', 'cm.mod@ecgt.com', crypt('mod123', gen_salt('bf', 10)), '2345-6789', CURRENT_DATE, 2),
('Ana', 'Lopez', 'al.mod@ecgt.com', crypt('mod123', gen_salt('bf', 10)), '3456-7890', CURRENT_DATE, 2),
('Pedro', 'Garcia', 'pg.mod@ecgt.com', crypt('mod123', gen_salt('bf', 10)), '4567-8901', CURRENT_DATE, 2),
('Maria', 'Rodriguez', 'mr.mod@ecgt.com', crypt('mod123', gen_salt('bf', 10)), '5678-9012', CURRENT_DATE, 2),
('Luis', 'Martinez', 'lm.mod@ecgt.com', crypt('mod123', gen_salt('bf', 10)), '6789-0123', CURRENT_DATE, 2);

-- 3 Usuarios de Logística
INSERT INTO users (first_name, last_name, email, password, phone, registration_date, role_id) VALUES 
('Jorge', 'Hernandez', 'jh.log@ecgt.com', crypt('log123', gen_salt('bf', 10)), '7890-1234', CURRENT_DATE, 3),
('Sofia', 'Ramirez', 'sr.log@ecgt.com', crypt('log123', gen_salt('bf', 10)), '8901-2345', CURRENT_DATE, 3),
('Daniel', 'Torres', 'dt.log@ecgt.com', crypt('log123', gen_salt('bf', 10)), '9012-3456', CURRENT_DATE, 3);

-- 10 Clientes (con dirección)
INSERT INTO users (first_name, last_name, email, password, phone, address, registration_date, role_id) VALUES 
('Roberto', 'Gutierrez', 'rg@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '1111-1111', 'Zona 1, Guatemala', CURRENT_DATE, 1),
('Laura', 'Morales', 'lm@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '2222-2222', 'Zona 10, Guatemala', CURRENT_DATE, 1),
('Miguel', 'Castro', 'mc@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '3333-3333', 'Zona 12, Guatemala', CURRENT_DATE, 1),
('Carmen', 'Flores', 'cf@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '4444-4444', 'Zona 7, Quetzaltenango', CURRENT_DATE, 1),
('Diego', 'Ruiz', 'dr@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '5555-5555', 'Zona 3, Escuintla', CURRENT_DATE, 1),
('Patricia', 'Jimenez', 'pj@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '6666-6666', 'Zona 5, Antigua Guatemala', CURRENT_DATE, 1),
('Fernando', 'Vargas', 'fv@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '7777-7777', 'Zona 2, Cobán', CURRENT_DATE, 1),
('Gabriela', 'Ortiz', 'go@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '8888-8888', 'Zona 4, Huehuetenango', CURRENT_DATE, 1),
('Ricardo', 'Sandoval', 'rs@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '9999-9999', 'Zona 6, Retalhuleu', CURRENT_DATE, 1),
('Valeria', 'Cruz', 'vc@gmail.com', crypt('cliente123', gen_salt('bf', 10)), '0000-0000', 'Zona 8, Jalapa', CURRENT_DATE, 1);

-- =====================================================
-- 3. INSERTAR CATEGORÍAS (15 categorías)
-- =====================================================

INSERT INTO categories (name, description) VALUES 
('Electrónica', 'Dispositivos y equipos electrónicos'),
('Computación', 'Computadoras, laptops y accesorios'),
('Celulares', 'Teléfonos móviles y smartphones'),
('Hogar', 'Artículos para el hogar y decoración'),
('Muebles', 'Muebles para casa y oficina'),
('Ropa', 'Prendas de vestir y accesorios'),
('Deportes', 'Artículos deportivos y fitness'),
('Libros', 'Libros físicos y material educativo'),
('Juguetes', 'Juguetes y juegos para niños'),
('Belleza', 'Productos de belleza y cuidado personal'),
('Electrodomésticos', 'Electrodomésticos para el hogar'),
('Música', 'Instrumentos musicales y audio'),
('Automóvil', 'Accesorios y repuestos para vehículos'),
('Jardín', 'Herramientas y decoración de jardín'),
('Mascotas', 'Productos para el cuidado de mascotas');

-- =====================================================
-- 4. INSERTAR 100 PRODUCTOS (10 por cliente)
-- =====================================================

-- Productos del Cliente 1 (Roberto - ID 10)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Laptop HP Pavilion', 'Laptop i5 8GB RAM 512GB SSD', '/images/p1.jpg', 5500.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Mouse Logitech MX', 'Mouse inalámbrico ergonómico', '/images/p2.jpg', 450.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Teclado Mecánico RGB', 'Teclado mecánico retroiluminado', '/images/p3.jpg', 650.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Monitor Samsung 24"', 'Monitor Full HD 75Hz', '/images/p4.jpg', 1200.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Webcam Logitech C920', 'Webcam HD 1080p', '/images/p5.jpg', 550.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Audífonos Sony WH-1000XM4', 'Audífonos con cancelación de ruido', '/images/p6.jpg', 2200.00, 6, false, CURRENT_DATE, CURRENT_DATE, 2, 10),
('SSD Samsung 1TB', 'Disco sólido externo', '/images/p7.jpg', 850.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Impresora HP LaserJet', 'Impresora láser monocromática', '/images/p8.jpg', 1800.00, 4, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Hub USB-C 7 puertos', 'Hub multipuertos USB-C', '/images/p9.jpg', 350.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 10),
('Cámara Web Razer Kiyo', 'Cámara streaming con luz', '/images/p10.jpg', 950.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 10);

-- Productos del Cliente 2 (Laura - ID 11)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('iPhone 13 128GB', 'Smartphone Apple desbloqueado', '/images/p11.jpg', 6500.00, 3, false, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Samsung Galaxy S22', 'Smartphone Android 256GB', '/images/p12.jpg', 5800.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('AirPods Pro', 'Audífonos inalámbricos Apple', '/images/p13.jpg', 1800.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Smartwatch Apple Watch', 'Reloj inteligente Series 7', '/images/p14.jpg', 3200.00, 4, false, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Cargador Inalámbrico', 'Cargador rápido Qi 15W', '/images/p15.jpg', 250.00, 30, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Funda iPhone Premium', 'Funda de cuero original', '/images/p16.jpg', 450.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Power Bank 20000mAh', 'Batería portátil carga rápida', '/images/p17.jpg', 380.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Soporte Celular Auto', 'Soporte magnético para auto', '/images/p18.jpg', 180.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Cable USB-C Trenzado', 'Cable de carga reforzado 2m', '/images/p19.jpg', 120.00, 50, true, CURRENT_DATE, CURRENT_DATE, 2, 11),
('Protector Pantalla Vidrio', 'Protector templado anti-golpes', '/images/p20.jpg', 90.00, 40, true, CURRENT_DATE, CURRENT_DATE, 2, 11);

-- Productos del Cliente 3 (Miguel - ID 12)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Sofá 3 Plazas Gris', 'Sofá moderno tapizado', '/images/p21.jpg', 3500.00, 2, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Mesa Comedor Madera', 'Mesa para 6 personas', '/images/p22.jpg', 2800.00, 3, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Juego de Sillas x4', 'Sillas tapizadas modernas', '/images/p23.jpg', 1600.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Lámpara de Pie LED', 'Lámpara regulable moderna', '/images/p24.jpg', 650.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Espejo Decorativo 120cm', 'Espejo de pared marco dorado', '/images/p25.jpg', 850.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Alfombra Persa 2x3m', 'Alfombra decorativa sala', '/images/p26.jpg', 1200.00, 4, false, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Cojines Decorativos x6', 'Cojines variados colores', '/images/p27.jpg', 320.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Cortinas Blackout 2.5m', 'Cortinas térmicas opacas', '/images/p28.jpg', 480.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Organizador Closet', 'Sistema de almacenamiento', '/images/p29.jpg', 950.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 12),
('Cuadros Decorativos x3', 'Set de cuadros abstractos', '/images/p30.jpg', 550.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 12);

-- Productos del Cliente 4 (Carmen - ID 13)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Refrigerador LG 14p³', 'Refrigerador No Frost acero', '/images/p31.jpg', 4500.00, 2, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Microondas Samsung', 'Microondas digital 1.1p³', '/images/p32.jpg', 1100.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Licuadora Oster 600W', 'Licuadora 10 velocidades', '/images/p33.jpg', 450.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Cafetera Nespresso', 'Cafetera cápsulas automática', '/images/p34.jpg', 1800.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Batidora KitchenAid', 'Batidora de pie 5Qt', '/images/p35.jpg', 2200.00, 3, false, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Tostadora 4 Rebanadas', 'Tostadora acero inoxidable', '/images/p36.jpg', 380.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Olla Arrocera 10 Tazas', 'Olla eléctrica multifunción', '/images/p37.jpg', 550.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Freidora Aire 5.5L', 'Air Fryer digital', '/images/p38.jpg', 950.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Juego Ollas Acero x12', 'Set ollas antiadherentes', '/images/p39.jpg', 1200.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 13),
('Extractor Jugos Slow', 'Extractor prensado frío', '/images/p40.jpg', 1600.00, 4, true, CURRENT_DATE, CURRENT_DATE, 2, 13);

-- Productos del Cliente 5 (Diego - ID 14)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Bicicleta Montaña 29"', 'Bicicleta 21 velocidades', '/images/p41.jpg', 2800.00, 4, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Caminadora Eléctrica', 'Caminadora plegable 2.5HP', '/images/p42.jpg', 3500.00, 2, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Pesas Ajustables 20kg', 'Set mancuernas regulables', '/images/p43.jpg', 850.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Colchoneta Yoga 6mm', 'Colchoneta antideslizante', '/images/p44.jpg', 250.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Balón Medicinal 5kg', 'Balón ejercicio profesional', '/images/p45.jpg', 320.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Cuerda Saltar Pro', 'Cuerda velocidad ajustable', '/images/p46.jpg', 180.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Guantes Gimnasio Pro', 'Guantes levantamiento pesas', '/images/p47.jpg', 220.00, 18, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Banda Resistencia Set', 'Set 5 bandas elásticas', '/images/p48.jpg', 280.00, 22, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Rodillo Foam 90cm', 'Rodillo masaje muscular', '/images/p49.jpg', 320.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 14),
('Botella Agua 2L', 'Botella deportiva libre BPA', '/images/p50.jpg', 150.00, 30, true, CURRENT_DATE, CURRENT_DATE, 2, 14);

-- Productos del Cliente 6 (Patricia - ID 15)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Cálculo Stewart 8va Ed', 'Libro universitario matemáticas', '/images/p51.jpg', 650.00, 10, false, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Física Serway 10ma Ed', 'Libro física universitaria', '/images/p52.jpg', 720.00, 8, false, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Química Chang 12va Ed', 'Libro química general', '/images/p53.jpg', 680.00, 6, false, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Java How to Program', 'Libro programación Java', '/images/p54.jpg', 550.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Clean Code Robert Martin', 'Libro buenas prácticas código', '/images/p55.jpg', 480.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Sapiens Yuval Harari', 'Libro historia humanidad', '/images/p56.jpg', 380.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('1984 George Orwell', 'Novela distópica clásica', '/images/p57.jpg', 180.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Cien Años Soledad', 'Novela García Márquez', '/images/p58.jpg', 220.00, 18, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('Don Quijote Cervantes', 'Clásico literatura española', '/images/p59.jpg', 280.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 15),
('El Principito', 'Libro infantil ilustrado', '/images/p60.jpg', 120.00, 30, true, CURRENT_DATE, CURRENT_DATE, 2, 15);

-- Productos del Cliente 7 (Fernando - ID 16)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('LEGO Star Wars 1000pzs', 'Set construcción colección', '/images/p61.jpg', 850.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('PlayStation 5 Digital', 'Consola videojuegos Sony', '/images/p62.jpg', 5500.00, 2, false, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Control Xbox Inalámbrico', 'Control edición especial', '/images/p63.jpg', 650.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Monopoly Edición Clásica', 'Juego mesa familiar', '/images/p64.jpg', 280.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Rompecabezas 2000 Piezas', 'Puzzle paisaje naturaleza', '/images/p65.jpg', 320.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Hot Wheels Pista Mega', 'Pista carreras loops', '/images/p66.jpg', 950.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Barbie Casa Ensueño', 'Casa muñecas 3 pisos', '/images/p67.jpg', 1200.00, 4, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Nerf Elite Blaster', 'Pistola dardos espuma', '/images/p68.jpg', 420.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Drone con Cámara HD', 'Drone control remoto', '/images/p69.jpg', 1800.00, 5, true, CURRENT_DATE, CURRENT_DATE, 2, 16),
('Robot Programable', 'Robot educativo STEM', '/images/p70.jpg', 980.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 16);

-- Productos del Cliente 8 (Gabriela - ID 17)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Perfume Chanel N°5 100ml', 'Perfume mujer clásico', '/images/p71.jpg', 3200.00, 4, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Set Maquillaje MAC', 'Kit maquillaje profesional', '/images/p72.jpg', 1800.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Plancha Cabello Cerámica', 'Plancha profesional 230°C', '/images/p73.jpg', 550.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Secadora Cabello Ionic', 'Secadora 2000W profesional', '/images/p74.jpg', 680.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Crema Facial La Roche', 'Crema hidratante SPF 50', '/images/p75.jpg', 420.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Sérum Vitamina C', 'Sérum antiedad orgánico', '/images/p76.jpg', 380.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Esmaltes Set x12', 'Colección esmaltes uñas', '/images/p77.jpg', 280.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Rizador Automático', 'Rizador cabello cerámico', '/images/p78.jpg', 750.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Espejo Luz LED Tocador', 'Espejo maquillaje aumento', '/images/p79.jpg', 520.00, 9, true, CURRENT_DATE, CURRENT_DATE, 2, 17),
('Brochas Maquillaje x15', 'Set brochas profesionales', '/images/p80.jpg', 450.00, 11, true, CURRENT_DATE, CURRENT_DATE, 2, 17);

-- Productos del Cliente 9 (Ricardo - ID 18)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Llanta Michelin 205/55R16', 'Llanta auto alta duración', '/images/p81.jpg', 850.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Batería Auto 750A', 'Batería libre mantenimiento', '/images/p82.jpg', 950.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Aceite Motor Mobil 1 5W30', 'Aceite sintético 5 litros', '/images/p83.jpg', 480.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Filtro Aire K&N', 'Filtro alto rendimiento', '/images/p84.jpg', 420.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Balatas Freno Delanteras', 'Balatas cerámica premium', '/images/p85.jpg', 380.00, 18, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Escáner OBD2 Bluetooth', 'Escáner diagnóstico auto', '/images/p86.jpg', 650.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Cámara Reversa HD', 'Cámara visión nocturna', '/images/p87.jpg', 550.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('GPS Garmin Automotriz', 'GPS navegación 7 pulgadas', '/images/p88.jpg', 1200.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Limpia Parabrisas Bosch', 'Set 2 plumas 22" y 18"', '/images/p89.jpg', 280.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 18),
('Tapete Auto Premium', 'Tapetes goma 4 piezas', '/images/p90.jpg', 350.00, 14, true, CURRENT_DATE, CURRENT_DATE, 2, 18);

-- Productos del Cliente 10 (Valeria - ID 19)
INSERT INTO products (name, description, image_url, price, stock, is_new, creation_date, last_updated_date, review_status, owner_id) VALUES 
('Alimento Perro Purina 20kg', 'Croquetas adulto razas grandes', '/images/p91.jpg', 650.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Alimento Gato Royal 10kg', 'Croquetas premium indoor', '/images/p92.jpg', 580.00, 12, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Arena Gato Ever Clean 25lb', 'Arena aglutinante sin olor', '/images/p93.jpg', 420.00, 18, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Casa Perro Grande', 'Casa plástico resistente', '/images/p94.jpg', 950.00, 6, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Rascador Gato Torre', 'Torre rascador 120cm', '/images/p95.jpg', 850.00, 8, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Correa Retráctil 5m', 'Correa extensible perros 50kg', '/images/p96.jpg', 280.00, 20, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Juguete Kong Perro', 'Juguete caucho resistente', '/images/p97.jpg', 180.00, 25, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Fuente Agua Gatos', 'Fuente eléctrica 2L filtro', '/images/p98.jpg', 550.00, 10, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Transportadora Mascotas', 'Transportadora IATA approved', '/images/p99.jpg', 750.00, 7, true, CURRENT_DATE, CURRENT_DATE, 2, 19),
('Cepillo Deshedding', 'Cepillo quita pelo profesional', '/images/p100.jpg', 320.00, 15, true, CURRENT_DATE, CURRENT_DATE, 2, 19);

-- =====================================================
-- 5. INSERTAR RELACIONES PRODUCTO-CATEGORÍA
-- =====================================================

-- Productos Cliente 1 (Computación/Electrónica)
INSERT INTO product_categories (product_id, category_id) VALUES 
(1, 2), (1, 1),  -- Laptop: Computación, Electrónica
(2, 2),          -- Mouse: Computación
(3, 2),          -- Teclado: Computación
(4, 2), (4, 1),  -- Monitor: Computación, Electrónica
(5, 2), (5, 1),  -- Webcam: Computación, Electrónica
(6, 1), (6, 12), -- Audífonos: Electrónica, Música
(7, 2),          -- SSD: Computación
(8, 2), (8, 1),  -- Impresora: Computación, Electrónica
(9, 2),          -- Hub USB: Computación
(10, 2), (10, 1); -- Cámara Web: Computación, Electrónica

-- Productos Cliente 2 (Celulares/Electrónica)
INSERT INTO product_categories (product_id, category_id) VALUES 
(11, 3), (11, 1), -- iPhone: Celulares, Electrónica
(12, 3), (12, 1), -- Samsung: Celulares, Electrónica
(13, 3), (13, 12), -- AirPods: Celulares, Música
(14, 3), (14, 1), -- Apple Watch: Celulares, Electrónica
(15, 3), (15, 1), -- Cargador: Celulares, Electrónica
(16, 3),          -- Funda: Celulares
(17, 3), (17, 1), -- Power Bank: Celulares, Electrónica
(18, 3), (18, 13), -- Soporte Auto: Celulares, Automóvil
(19, 3),          -- Cable: Celulares
(20, 3);          -- Protector: Celulares

------ PRUEBA PRODUCTOS HASTA AQUI ----------------

-- Productos Cliente 3 (Hogar/Muebles)
INSERT INTO product_categories (product_id, category_id) VALUES 
(21, 5), (21, 4), -- Sofá: Muebles, Hogar
(22, 5), (22, 4), -- Mesa: Muebles, Hogar
(23, 5), (23, 4), -- Sillas: Muebles, Hogar
(24, 4), (24, 1), -- Lámpara: Hogar, Electrónica
(25, 4),          -- Espejo: Hogar
(26, 4),          -- Alfombra: Hogar
(27, 4),          -- Cojines: Hogar
(28, 4),          -- Cortinas: Hogar
(29, 4), (29, 5), -- Organizador: Hogar, Muebles
(30, 4);          -- Cuadros: Hogar

-- Productos Cliente 4 (Electrodomésticos)
INSERT INTO product_categories (product_id, category_id) VALUES 
(31, 11), (31, 1), -- Refrigerador: Electrodomésticos, Electrónica
(32, 11), (32, 1), -- Microondas: Electrodomésticos, Electrónica
(33, 11), (33, 4), -- Licuadora: Electrodomésticos, Hogar
(34, 11), (34, 4), -- Cafetera: Electrodomésticos, Hogar
(35, 11), (35, 4), -- Batidora: Electrodomésticos, Hogar
(36, 11), (36, 4), -- Tostadora: Electrodomésticos, Hogar
(37, 11), (37, 4), -- Olla Arrocera: Electrodomésticos, Hogar
(38, 11), (38, 4), -- Freidora: Electrodomésticos, Hogar
(39, 11), (39, 4), -- Ollas: Electrodomésticos, Hogar
(40, 11), (40, 4); -- Extractor: Electrodomésticos, Hogar

-- Productos Cliente 5 (Deportes)
INSERT INTO product_categories (product_id, category_id) VALUES 
(41, 7),          -- Bicicleta: Deportes
(42, 7), (42, 1), -- Caminadora: Deportes, Electrónica
(43, 7),          -- Pesas: Deportes
(44, 7),          -- Colchoneta: Deportes
(45, 7),          -- Balón: Deportes
(46, 7),          -- Cuerda: Deportes
(47, 7),          -- Guantes: Deportes
(48, 7),          -- Bandas: Deportes
(49, 7),          -- Rodillo: Deportes
(50, 7);          -- Botella: Deportes

-- Productos Cliente 6 (Libros)
INSERT INTO product_categories (product_id, category_id) VALUES 
(51, 8),          -- Cálculo: Libros
(52, 8),          -- Física: Libros
(53, 8),          -- Química: Libros
(54, 8),          -- Java: Libros
(55, 8),          -- Clean Code: Libros
(56, 8),          -- Sapiens: Libros
(57, 8),          -- 1984: Libros
(58, 8),          -- Cien Años: Libros
(59, 8),          -- Don Quijote: Libros
(60, 8), (60, 9); -- El Principito: Libros, Juguetes

-- Productos Cliente 7 (Juguetes/Electrónica)
INSERT INTO product_categories (product_id, category_id) VALUES 
(61, 9),          -- LEGO: Juguetes
(62, 9), (62, 1), -- PlayStation: Juguetes, Electrónica
(63, 9), (63, 1), -- Control Xbox: Juguetes, Electrónica
(64, 9),          -- Monopoly: Juguetes
(65, 9),          -- Rompecabezas: Juguetes
(66, 9),          -- Hot Wheels: Juguetes
(67, 9),          -- Barbie: Juguetes
(68, 9),          -- Nerf: Juguetes
(69, 9), (69, 1), -- Drone: Juguetes, Electrónica
(70, 9), (70, 1); -- Robot: Juguetes, Electrónica

-- Productos Cliente 8 (Belleza)
INSERT INTO product_categories (product_id, category_id) VALUES 
(71, 10),         -- Perfume: Belleza
(72, 10),         -- Maquillaje: Belleza
(73, 10), (73, 1), -- Plancha: Belleza, Electrónica
(74, 10), (74, 1), -- Secadora: Belleza, Electrónica
(75, 10),         -- Crema: Belleza
(76, 10),         -- Sérum: Belleza
(77, 10),         -- Esmaltes: Belleza
(78, 10), (78, 1), -- Rizador: Belleza, Electrónica
(79, 10), (79, 4), -- Espejo: Belleza, Hogar
(80, 10);         -- Brochas: Belleza

-- Productos Cliente 9 (Automóvil)
INSERT INTO product_categories (product_id, category_id) VALUES 
(81, 13),         -- Llanta: Automóvil
(82, 13),         -- Batería: Automóvil
(83, 13),         -- Aceite: Automóvil
(84, 13),         -- Filtro: Automóvil
(85, 13),         -- Balatas: Automóvil
(86, 13), (86, 1), -- Escáner: Automóvil, Electrónica
(87, 13), (87, 1), -- Cámara: Automóvil, Electrónica
(88, 13), (88, 1), -- GPS: Automóvil, Electrónica
(89, 13),         -- Limpia Parabrisas: Automóvil
(90, 13);         -- Tapete: Automóvil

-- Productos Cliente 10 (Mascotas)
INSERT INTO product_categories (product_id, category_id) VALUES 
(91, 15),         -- Alimento Perro: Mascotas
(92, 15),         -- Alimento Gato: Mascotas
(93, 15),         -- Arena: Mascotas
(94, 15),         -- Casa: Mascotas
(95, 15),         -- Rascador: Mascotas
(96, 15),         -- Correa: Mascotas
(97, 15),         -- Juguete: Mascotas
(98, 15), (98, 1), -- Fuente: Mascotas, Electrónica
(99, 15),         -- Transportadora: Mascotas
(100, 15);        -- Cepillo: Mascotas

-- =====================================================
-- FIN DEL SCRIPT DML
-- =====================================================
