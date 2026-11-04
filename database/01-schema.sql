SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS minerva_lib_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE minerva_lib_db;

CREATE TABLE IF NOT EXISTS authors(
    id_author INT PRIMARY KEY AUTO_INCREMENT,
    name_author VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS publishers(
    id_publisher INT PRIMARY KEY AUTO_INCREMENT,
    name_publisher VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres(
    id_genre INT PRIMARY KEY AUTO_INCREMENT,
    name_genre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS books(
    id_book INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    image_url VARCHAR(2048) NULL,
    year_publication SMALLINT UNSIGNED NOT NULL,
    no_pages INT NOT NULL,
    wrote_language VARCHAR(50) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    stock INT NOT NULL,
    id_author INT NULL,
    id_publisher INT NULL,
    id_genre INT NOT NULL,
    FOREIGN KEY (id_author) REFERENCES authors(id_author) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_publisher) REFERENCES publishers(id_publisher) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (id_genre) REFERENCES genres(id_genre) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    dpi VARCHAR(13) NOT NULL CHECK (CHAR_LENGTH(dpi) = 13),
    name_user VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(8) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS loans(
    id_loan INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    date_loan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expected_return_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP NULL, 
    state_loan ENUM('pendiente', 'activo', 'devolucion_solicitada', 'devuelto', 'rechazado') DEFAULT 'pendiente',
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS loan_details(
    id_loan_detail INT PRIMARY KEY AUTO_INCREMENT,
    id_loan INT NOT NULL,
    id_book INT NOT NULL,
    state_book_out ENUM('Excelente', 'Regular', 'Maltratado') NOT NULL,
    state_book_in ENUM('Excelente', 'Regular', 'Maltratado') NULL, 
    FOREIGN KEY (id_loan) REFERENCES loans(id_loan) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_book) REFERENCES books(id_book) ON UPDATE CASCADE ON DELETE CASCADE
);  

CREATE TABLE IF NOT EXISTS sales(
    id_sale INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    date_sale TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(6,2) NOT NULL,
    state_sale ENUM('pendiente_pago', 'confirmada', 'rechazada') DEFAULT 'pendiente_pago',
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sale_details(
    id_sale_details INT PRIMARY KEY AUTO_INCREMENT,
    id_sale INT NOT NULL,
    id_book INT NOT NULL,
    amount INT NOT NULL,
    unit_price DECIMAL(6,2) NOT NULL,
    FOREIGN KEY (id_sale) REFERENCES sales(id_sale),
    FOREIGN KEY (id_book) REFERENCES books(id_book)
);