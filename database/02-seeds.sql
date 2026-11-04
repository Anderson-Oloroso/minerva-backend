USE minerva_lib_db;

START TRANSACTION;

-- 1. Autores (10 autores)
INSERT INTO authors (id_author, name_author) VALUES 
(1, 'Gabriel García Márquez'),
(2, 'Isabel Allende'),
(3, 'Jorge Luis Borges'),
(4, 'Miguel de Cervantes'),
(5, 'Julio Cortázar'),
(6, 'Mario Vargas Llosa'),
(7, 'Juan Rulfo'),
(8, 'Ernest Hemingway'),
(9, 'Isaac Asimov'),
(10, 'Agatha Christie');

-- 2. Editoriales (6 editoriales)
INSERT INTO publishers (id_publisher, name_publisher) VALUES 
(1, 'Editorial Sudamericana'),
(2, 'Alfaguara'),
(3, 'Planeta'),
(4, 'Penguin Random House'),
(5, 'Seix Barral'),
(6, 'Fondo de Cultura Económica');

-- 3. Géneros (10 categorías)
INSERT INTO genres (id_genre, name_genre) VALUES 
(1, 'Realismo Mágico'),
(2, 'Ficción'),
(3, 'Ensayo'),
(4, 'Novela Clásica'),
(5, 'Cuento / Relato'),
(6, 'Novela Contemporánea'),
(7, 'Ciencia Ficción'),
(8, 'Misterio y Suspenso'),
(9, 'Poesía'),
(10, 'Historia');

INSERT INTO books (id_book, title, isbn, year_publication, no_pages, wrote_language, price, stock, id_author, id_publisher, id_genre) VALUES 
(1, 'Cien años de soledad', '9780307474728', 1967, 417, 'Español', 125.50, 10, 1, 1, 1),
(2, 'La casa de los espíritus', '9788401024467', 1982, 448, 'Español', 110.00, 8, 2, 2, 2),
(3, 'Ficciones', '9789875666489', 1944, 220, 'Español', 95.00, 5, 3, 3, 3),
(4, 'Don Quijote de la Mancha', '9788420412143', 1605, 863, 'Español', 180.00, 6, 4, 4, 4),
(5, 'Rayuela', '9788437604572', 1963, 600, 'Español', 140.00, 7, 5, 5, 2),
(6, 'La ciudad y los perros', '9788466330930', 1963, 448, 'Español', 105.00, 4, 6, 2, 6),
(7, 'Pedro Páramo', '9789681607593', 1955, 132, 'Español', 85.00, 12, 7, 6, 1),
(8, 'El viejo y el mar', '9780684801223', 1952, 128, 'Español', 90.00, 9, 8, 4, 4),
(9, 'Fundación', '9788497593847', 1951, 255, 'Español', 115.00, 15, 9, 3, 7),
(10, 'Diez negritos', '9788467035987', 1939, 230, 'Español', 95.00, 11, 10, 2, 8),

-- Lote 11 a 30 (Ficción y Novela Contemporánea)
(11, 'Crónica de una muerte anunciada', '9788437607597', 1981, 120, 'Español', 80.00, 14, 1, 2, 6),
(12, 'De amor y de sombra', '9788401382895', 1984, 304, 'Español', 100.00, 9, 2, 3, 2),
(13, 'El Aleph', '9789875666496', 1949, 168, 'Español', 90.00, 6, 3, 1, 5),
(14, 'Novelas Ejemplares', '9788424922887', 1613, 350, 'Español', 130.00, 5, 4, 5, 4),
(15, 'Bestiario', '9788437607719', 1951, 160, 'Español', 75.00, 10, 5, 4, 5),
(16, 'La tía Julia y el escribidor', '9788466330947', 1977, 447, 'Español', 112.00, 8, 6, 2, 6),
(17, 'El llano en llamas', '9789681602260', 1953, 144, 'Español', 78.00, 13, 7, 6, 5),
(18, 'Por quién doblan las campanas', '9788401328084', 1940, 680, 'Español', 165.00, 7, 8, 3, 4),
(19, 'Yo, robot', '9788445073575', 1950, 256, 'Español', 105.00, 10, 9, 4, 7),
(20, 'Asesinato en el Orient Express', '9788467035994', 1934, 256, 'Español', 98.00, 12, 10, 2, 8),

(21, 'El amor en los tiempos del cólera', '9788437604565', 1985, 464, 'Español', 135.00, 10, 1, 1, 1),
(22, 'La suma de los días', '9788401019685', 2007, 320, 'Español', 115.00, 6, 2, 2, 3),
(23, 'El informe de Brodie', '9789875666502', 1970, 150, 'Español', 88.00, 5, 3, 3, 5),
(24, 'Los trabajos de Persiles y Sigismunda', '9788424922894', 1617, 512, 'Español', 150.00, 4, 4, 5, 4),
(25, 'Final del juego', '9788437607726', 1956, 208, 'Español', 82.00, 8, 5, 4, 5),
(26, 'Conversación en La Catedral', '9788466330954', 1969, 736, 'Español', 170.00, 6, 6, 2, 6),
(27, 'El gallo de oro', '9789681602277', 1980, 110, 'Español', 70.00, 15, 7, 6, 5),
(28, 'París es una fiesta', '9780684801230', 1964, 192, 'Español', 92.00, 9, 8, 4, 3),
(29, 'Bóvedas de acero', '9788445073582', 1954, 224, 'Español', 100.00, 7, 9, 3, 7),
(30, 'Muerte en el Nilo', '9788467036007', 1937, 320, 'Español', 102.00, 9, 10, 2, 8),

-- Lote 31 a 50 (Variedad ampliada de registros)
(31, 'El otoño del patriarca', '9788437604589', 1975, 271, 'Español', 118.00, 7, 1, 1, 1),
(32, 'Eva Luna', '9788401382901', 1987, 308, 'Español', 108.00, 11, 2, 2, 2),
(33, 'El hacedor', '9789875666519', 1960, 140, 'Español', 85.00, 6, 3, 3, 9),
(34, 'La Galatea', '9788424922900', 1585, 300, 'Español', 120.00, 4, 4, 5, 4),
(35, 'Los premios', '9788437607733', 1960, 360, 'Español', 110.00, 5, 5, 4, 6),
(36, 'Pantaleón y las visitadoras', '9788466330961', 1973, 256, 'Español', 96.00, 10, 6, 2, 6),
(37, 'Días de combate', '9789681602284', 1970, 120, 'Español', 72.00, 8, 7, 6, 5),
(38, 'Adiós a las armas', '9780684801247', 1929, 352, 'Español', 122.00, 8, 8, 4, 4),
(39, 'Los propios dioses', '9788445073599', 1972, 288, 'Español', 115.00, 9, 9, 3, 7),
(40, 'El misterio de Pale Horse', '9788467036014', 1961, 256, 'Español', 95.00, 7, 10, 2, 8),

(41, 'Ojos de perro azul', '9788437604596', 1972, 160, 'Español', 79.00, 12, 1, 1, 5),
(42, 'Hija de la fortuna', '9788401019692', 1999, 432, 'Español', 130.00, 8, 2, 2, 2),
(43, 'Discusión', '9789875666526', 1932, 208, 'Español', 89.00, 5, 3, 3, 3),
(44, 'Rinconete y Cortadillo', '9788424922917', 1613, 90, 'Español', 65.00, 14, 4, 5, 5),
(45, 'Historias de cronopios y de famas', '9788437607740', 1962, 160, 'Español', 81.00, 10, 5, 4, 5),
(46, 'La tía Julia y el escribidor (Ed. Esp)', '9788466330978', 1977, 450, 'Español', 105.00, 7, 6, 2, 6),
(47, 'El gallo de oro (Antología)', '9789681602291', 1982, 130, 'Español', 75.00, 11, 7, 6, 5),
(48, 'Tener y no tener', '9780684801254', 1937, 240, 'Español', 99.00, 6, 8, 4, 4),
(49, 'Los límites de la fundación', '9788445073605', 1982, 464, 'Español', 145.00, 5, 9, 3, 7),
(50, 'Culpabilidad cero', '9788467036021', 1942, 240, 'Español', 94.00, 8, 10, 2, 8),

-- Lote 51 a 75 (Expansión de universos literarios e históricos)
(51, 'La hojarasca', '9788437604602', 1955, 144, 'Español', 82.00, 13, 1, 1, 6),
(52, 'Retrato en sepia', '9788401382918', 2000, 304, 'Español', 112.00, 9, 2, 2, 2),
(53, 'El otro, el mismo', '9789875666533', 1964, 170, 'Español', 84.00, 7, 3, 3, 9),
(54, 'La fuerza de la sangre', '9788424922924', 1613, 85, 'Español', 60.00, 10, 4, 5, 5),
(55, 'Todos los fuegos el fuego', '9788437607757', 1966, 224, 'Español', 91.00, 8, 5, 4, 5),
(56, 'La casa verde', '9788466330985', 1966, 224, 'Español', 97.00, 6, 6, 2, 6),
(57, 'El gallo de oro y otros textos', '9789681602307', 1985, 150, 'Español', 77.00, 12, 7, 6, 5),
(58, 'El jardín del Edén', '9780684801261', 1986, 272, 'Español', 104.00, 5, 8, 4, 4),
(59, 'Fundación e Imperio', '9788445073612', 1952, 256, 'Español', 118.00, 10, 9, 3, 7),
(60, 'Cenizas trágicas', '9788467036038', 1940, 220, 'Español', 90.00, 8, 10, 2, 8),

(61, 'El coronel no tiene quien le escriba', '9788437604619', 1961, 112, 'Español', 75.00, 15, 1, 1, 6),
(62, 'Zorro: Comienza la leyenda', '9788401019708', 2005, 400, 'Español', 128.00, 7, 2, 2, 2),
(63, 'Elogio de la sombra', '9789875666540', 1969, 120, 'Español', 80.00, 6, 3, 3, 9),
(64, 'La española inglesa', '9788424922931', 1613, 95, 'Español', 68.00, 11, 4, 5, 5),
(65, 'Octaedro', '9788437607764', 1974, 150, 'Español', 83.00, 9, 5, 4, 5),
(66, 'Lituma en los Andes', '9788466330992', 1993, 320, 'Español', 115.00, 5, 6, 2, 6),
(67, 'El gallo de oro (Edición crítica)', '9789681602314', 1988, 160, 'Español', 82.00, 8, 7, 6, 10),
(68, 'En otro país', '9780684801278', 1930, 110, 'Español', 70.00, 10, 8, 4, 5),
(69, 'Preludio a la Fundación', '9788445073629', 1988, 400, 'Español', 132.00, 6, 9, 3, 7),
(70, 'Un cadáver en la biblioteca', '9788467036045', 1942, 240, 'Español', 96.00, 9, 10, 2, 8),

-- Lote 71 a 100 (Cierre y máxima variedad de registros)
(71, 'La mala hora', '9788437604626', 1962, 192, 'Español', 88.00, 10, 1, 1, 6),
(72, 'El cuaderno de Maya', '9788401019715', 2011, 448, 'Español', 135.00, 8, 2, 2, 6),
(73, 'Siete noches', '9789875666557', 1980, 180, 'Español', 92.00, 5, 3, 3, 3),
(74, 'El amante liberal', '9788424922948', 1613, 100, 'Español', 70.00, 7, 4, 5, 5),
(75, 'Alguien que anda por ahí', '9788437607771', 1977, 190, 'Español', 86.00, 9, 5, 4, 5),
(76, 'La fiesta del Chivo', '9788466331005', 2000, 560, 'Español', 150.00, 4, 6, 2, 10),
(77, 'Pedro Páramo (Ed. Comentada)', '9789681602321', 1990, 200, 'Español', 95.00, 11, 7, 6, 1),
(78, 'Isla de bucaneros', '9780684801285', 1935, 210, 'Español', 88.00, 7, 8, 4, 4),
(79, 'Hacia la Fundación', '9788445073636', 1993, 384, 'Español', 125.00, 8, 9, 3, 7),
(80, 'Cianuro espumoso', '9788467036052', 1945, 250, 'Español', 97.00, 10, 10, 2, 8),

(81, 'Relato de un náufrago', '9788437604633', 1970, 144, 'Español', 78.00, 14, 1, 1, 6),
(82, 'El juego de Ripper', '9788401019722', 2014, 440, 'Español', 138.00, 6, 2, 2, 8),
(83, 'Atlas', '9789875666564', 1984, 150, 'Español', 85.00, 4, 3, 3, 9),
(84, 'La fuerza de la sangre (Ext)', '9788424922955', 1613, 92, 'Español', 65.00, 8, 4, 5, 5),
(85, 'Queremos tanto a Glota', '9788437607788', 1980, 130, 'Español', 75.00, 12, 5, 4, 5),
(86, 'Travesuras de la niña mala', '9788466331012', 2006, 384, 'Español', 125.00, 7, 6, 2, 6),
(87, 'El gallo de oro (Versión Estudiantil)', '9789681602338', 1995, 140, 'Español', 72.00, 9, 7, 6, 1),
(88, 'Las nieves del Kilimanjaro', '9780684801292', 1936, 180, 'Español', 84.00, 11, 8, 4, 5),
(89, 'Los propios dioses (Ed. Rev)', '9788445073643', 1985, 300, 'Español', 110.00, 6, 9, 3, 7),
(90, 'Cianuro espumoso (Remake)', '9788467036069', 1950, 260, 'Español', 99.00, 7, 10, 2, 8),

(91, 'Noticia de un secuestro', '9788437604640', 1996, 320, 'Español', 115.00, 9, 1, 1, 10),
(92, 'Más allá del invierno', '9788401019739', 2017, 360, 'Español', 122.00, 5, 2, 2, 6),
(93, 'Borges oral', '9789875666571', 1979, 140, 'Español', 79.00, 8, 3, 3, 3),
(94, 'La gitanilla', '9788424922962', 1613, 110, 'Español', 72.00, 10, 4, 5, 5),
(95, 'Salvo el crepúsculo', '9788437607795', 1984, 250, 'Español', 98.00, 4, 5, 4, 9),
(96, 'El sueño del celta', '9788466331029', 2010, 464, 'Español', 140.00, 6, 6, 2, 10),
(97, 'El llano en llamas (Ed. Especial)', '9789681602345', 2000, 160, 'Español', 85.00, 13, 7, 6, 5),
(98, 'París era una fiesta (Deluxe)', '9780684801308', 2000, 200, 'Español', 95.00, 7, 8, 4, 3),
(99, 'Nemesis', '9788445073650', 1992, 320, 'Español', 120.00, 5, 9, 3, 7),
(100, 'Cianuro espumoso (Edición Aniversario)', '9788467036076', 2020, 280, 'Español', 105.00, 8, 10, 2, 8);

-- 5. Insertar Usuarios (2 Administradores y 10 Usuarios Regulares)
INSERT INTO users (id_user, dpi, name_user, last_name, phone, email, password, role, is_active) VALUES
(1, '3012345670101', 'Admin', 'Sistema', '55000000', 'admin@minerva.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'admin', TRUE),
(2, '3012345670202', 'Carla Sofía', 'Méndez Arriaza', '55000001', 'soporte.admin@minerva.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'admin', TRUE),
(3, '2987654320102', 'Juan Carlos', 'Pérez Morales', '55123456', 'juan.perez@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(4, '2541239870103', 'Ana Lucía', 'Gómez Ruano', '55987654', 'ana.gomez@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(5, '2365478910104', 'Carlos Enrique', 'Estrada López', '55432109', 'carlos.estrada@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(6, '2412365470105', 'María Fernanda', 'Castillo Ruano', '55789012', 'maria.castillo@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(7, '2236547890106', 'Luis Fernando', 'Morales Castro', '55234567', 'luis.morales@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(8, '2789123450107', 'Gabriela Nohemí', 'Santos Lima', '55890123', 'gabriela.santos@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(9, '2145698730108', 'Jorge Alejandro', 'Ramírez Cifuentes', '55345678', 'jorge.ramirez@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(10, '2654123870109', 'Claudia Patricia', 'Ortiz Barrientos', '55901234', 'claudia.ortiz@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(11, '2981234760110', 'Kevin Josué', 'Hernández Pineda', '55456789', 'kevin.hernandez@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE),
(12, '2378945610111', 'Valeria Nicole', 'Díaz Monzón', '55678901', 'valeria.diaz@gmail.com', '$2b$10$wvkCk89JJLkZ2ye1xSr9BO0WFWy3NyEZKCOdWfubK6fc8/IpltVcO', 'user', TRUE);

-- 6. Insertar Préstamos (Historial enriquecido con varios usuarios y estados mixtos)
INSERT INTO loans (id_loan, id_user, date_loan, expected_return_date, return_date, state_loan) VALUES
(1, 3, '2026-10-15 10:30:00', '2026-11-01 23:59:59', NULL, 'activo'),
(2, 4, '2026-09-10 14:00:00', '2026-09-24 23:59:59', '2026-09-22 11:15:00', 'devuelto'),
(3, 5, '2026-10-20 09:15:00', '2026-11-05 23:59:59', NULL, 'activo'),
(4, 6, '2026-10-22 11:00:00', '2026-11-08 23:59:59', NULL, 'activo'),
(5, 7, '2026-09-01 08:30:00', '2026-09-15 23:59:59', '2026-09-14 16:20:00', 'devuelto'),
(6, 8, '2026-10-25 15:45:00', '2026-11-10 23:59:59', NULL, 'activo');

-- 7. Detalles del Préstamo (Enlazados a libros reales del catálogo)
INSERT INTO loan_details (id_loan_detail, id_loan, id_book, state_book_out, state_book_in) VALUES 
(1, 1, 1, 'Excelente', NULL),
(2, 2, 5, 'Excelente', 'Regular'),
(3, 3, 7, 'Regular', NULL),
(4, 4, 9, 'Excelente', NULL),
(5, 5, 11, 'Maltratado', 'Maltratado'),
(6, 6, 15, 'Excelente', NULL);

-- 8. Insertar Ventas (Múltiples transacciones de compra de libros por varios usuarios)
INSERT INTO sales (id_sale, id_user, date_sale, total) VALUES
(1, 3, '2026-10-01 11:00:00', 110.00),
(2, 4, '2026-10-12 16:45:00', 270.00),
(3, 5, '2026-10-25 12:30:00', 180.00),
(4, 9, '2026-10-26 14:10:00', 215.00),
(5, 10, '2026-10-27 09:30:00', 125.50);

-- 9. Detalles de la Venta (Asociados correctamente a las ventas y libros)
INSERT INTO sale_details (id_sale_details, id_sale, id_book, amount, unit_price) VALUES 
(1, 1, 2, 1, 110.00),
(2, 2, 3, 1, 95.00),
(3, 2, 8, 1, 90.00),
(4, 2, 7, 1, 85.00),
(5, 3, 4, 1, 180.00),
(6, 4, 9, 1, 115.00),
(7, 4, 10, 1, 100.00),
(8, 5, 1, 1, 125.50);

COMMIT;
