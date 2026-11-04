SET NAMES utf8mb4;

-- =============================================
-- TRIGGERS (validación y actualización de stock)
-- =============================================

DROP TRIGGER IF EXISTS trg_before_insert_loan_detail;
DROP TRIGGER IF EXISTS trg_after_insert_loan_detail;
DROP TRIGGER IF EXISTS trg_before_insert_sale_detail;
DROP TRIGGER IF EXISTS trg_after_insert_sale_detail;
DROP TRIGGER IF EXISTS trg_after_update_loan_return;

-- Validar y descontar stock al prestar. El UPDATE condicional evita
-- que dos préstamos simultáneos consuman la última unidad.
DELIMITER //
CREATE TRIGGER trg_before_insert_loan_detail
BEFORE INSERT ON loan_details
FOR EACH ROW
BEGIN
    DECLARE book_exists INT DEFAULT 0;

    UPDATE books
    SET stock = stock - 1
    WHERE id_book = NEW.id_book AND stock > 0;

    IF ROW_COUNT() = 0 THEN
        SELECT COUNT(*) INTO book_exists
        FROM books
        WHERE id_book = NEW.id_book;

        IF book_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El libro no existe';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente para préstamo';
        END IF;
    END IF;
END //
DELIMITER ;

-- Validar y descontar stock al vender.
DELIMITER //
CREATE TRIGGER trg_before_insert_sale_detail
BEFORE INSERT ON sale_details
FOR EACH ROW
BEGIN
    DECLARE book_exists INT DEFAULT 0;

    IF NEW.amount IS NULL OR NEW.amount < 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad debe ser mayor que cero';
    END IF;

    UPDATE books
    SET stock = stock - NEW.amount
    WHERE id_book = NEW.id_book AND stock >= NEW.amount;

    IF ROW_COUNT() = 0 THEN
        SELECT COUNT(*) INTO book_exists
        FROM books
        WHERE id_book = NEW.id_book;

        IF book_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El libro no existe';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente para venta';
        END IF;
    END IF;
END //
DELIMITER ;

-- Restaurar una unidad por cada detalle al devolver el préstamo.
DELIMITER //
CREATE TRIGGER trg_after_update_loan_return
AFTER UPDATE ON loans
FOR EACH ROW
BEGIN
    IF OLD.state_loan = 'activo' AND NEW.state_loan = 'devuelto' THEN
        UPDATE books b
        INNER JOIN (
            SELECT id_book, COUNT(*) AS quantity
            FROM loan_details
            WHERE id_loan = NEW.id_loan
            GROUP BY id_book
        ) loaned_books ON loaned_books.id_book = b.id_book
        SET b.stock = b.stock + loaned_books.quantity;
    END IF;
END //
DELIMITER ;

-- =============================================
-- STORED PROCEDURES
-- =============================================

DROP PROCEDURE IF EXISTS sp_create_loan;
DROP PROCEDURE IF EXISTS sp_return_loan;
DROP PROCEDURE IF EXISTS sp_create_sale;

-- Crear un préstamo y sus detalles en una sola transacción.
DELIMITER //
CREATE PROCEDURE sp_create_loan(
    IN p_id_user INT,
    IN p_expected_return_date TIMESTAMP,
    IN p_details JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE n INT;
    DECLARE v_id_loan INT;
    DECLARE v_id_book INT;
    DECLARE v_state_out VARCHAR(20);
    DECLARE v_json_type VARCHAR(20);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF p_details IS NULL OR JSON_TYPE(p_details) <> 'ARRAY' OR JSON_LENGTH(p_details) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El préstamo debe incluir al menos un libro';
    END IF;

    SET n = JSON_LENGTH(p_details);

    INSERT INTO loans (id_user, expected_return_date)
    VALUES (p_id_user, p_expected_return_date);
    SET v_id_loan = LAST_INSERT_ID();

    WHILE i < n DO
        SET v_id_book = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_book')));
        SET v_json_type = JSON_TYPE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_book')));
        SET v_state_out = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].state_book_out')));

        IF v_json_type IS NULL OR v_json_type <> 'INTEGER' OR v_id_book < 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El ID del libro debe ser un entero positivo';
        END IF;

        IF v_state_out IS NULL OR v_state_out NOT IN ('Excelente', 'Regular', 'Maltratado') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El estado de salida del libro no es válido';
        END IF;

        INSERT INTO loan_details (id_loan, id_book, state_book_out)
        VALUES (v_id_loan, v_id_book, v_state_out);

        SET i = i + 1;
    END WHILE;

    COMMIT;
    SELECT v_id_loan AS id_loan;
END //
DELIMITER ;

-- Registrar el estado de cada libro y devolver un préstamo activo.
DELIMITER //
CREATE PROCEDURE sp_return_loan(
    IN p_id_loan INT,
    IN p_details JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE n INT;
    DECLARE v_id_loan_detail INT;
    DECLARE v_state_in VARCHAR(20);
    DECLARE v_detail_count INT DEFAULT 0;
    DECLARE v_detail_exists INT DEFAULT 0;
    DECLARE v_pending_details INT DEFAULT 0;
    DECLARE v_unique_detail_count INT DEFAULT 0;
    DECLARE v_state_loan VARCHAR(20);
    DECLARE v_json_type VARCHAR(20);

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_state_loan = NULL;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF p_details IS NULL OR JSON_TYPE(p_details) <> 'ARRAY' OR JSON_LENGTH(p_details) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La devolución debe incluir los detalles del préstamo';
    END IF;

    SELECT state_loan INTO v_state_loan
    FROM loans
    WHERE id_loan = p_id_loan
    FOR UPDATE;

    IF v_state_loan IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El préstamo no existe';
    END IF;

    IF v_state_loan <> 'activo' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El préstamo ya fue devuelto';
    END IF;

    SELECT COUNT(*) INTO v_detail_count
    FROM loan_details
    WHERE id_loan = p_id_loan;

    SET n = JSON_LENGTH(p_details);
    IF n <> v_detail_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debe incluir el estado de todos los libros del préstamo';
    END IF;

    SELECT COUNT(DISTINCT detail_id) INTO v_unique_detail_count
    FROM JSON_TABLE(
        p_details,
        '$[*]' COLUMNS (detail_id INT PATH '$.id_loan_detail')
    ) AS return_details;

    IF v_unique_detail_count <> v_detail_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Los detalles de devolución deben ser únicos y válidos';
    END IF;

    WHILE i < n DO
        SET v_id_loan_detail = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_loan_detail')));
        SET v_json_type = JSON_TYPE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_loan_detail')));
        SET v_state_in = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].state_book_in')));

        IF v_json_type IS NULL OR v_json_type <> 'INTEGER' OR v_id_loan_detail < 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El ID del detalle debe ser un entero positivo';
        END IF;

        IF v_state_in IS NULL OR v_state_in NOT IN ('Excelente', 'Regular', 'Maltratado') THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El estado de devolución del libro no es válido';
        END IF;

        SELECT COUNT(*) INTO v_detail_exists
        FROM loan_details
        WHERE id_loan_detail = v_id_loan_detail AND id_loan = p_id_loan;

        IF v_detail_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un detalle no pertenece al préstamo indicado';
        END IF;

        UPDATE loan_details
        SET state_book_in = v_state_in
        WHERE id_loan_detail = v_id_loan_detail AND id_loan = p_id_loan;

        SET i = i + 1;
    END WHILE;

    SELECT COUNT(*) INTO v_pending_details
    FROM loan_details
    WHERE id_loan = p_id_loan AND state_book_in IS NULL;

    IF v_pending_details > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Faltan estados de devolución de libros';
    END IF;

    UPDATE loans
    SET state_loan = 'devuelto', return_date = CURRENT_TIMESTAMP
    WHERE id_loan = p_id_loan AND state_loan = 'activo';

    COMMIT;
END //
DELIMITER ;

-- Crear una venta, descontar stock y calcular su total.
DELIMITER //
CREATE PROCEDURE sp_create_sale(
    IN p_id_user INT,
    IN p_details JSON
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE n INT;
    DECLARE v_id_sale INT;
    DECLARE v_id_book INT;
    DECLARE v_amount INT;
    DECLARE v_json_type VARCHAR(20);
    DECLARE v_book_exists INT DEFAULT 0;
    DECLARE v_unit_price DECIMAL(6,2);
    DECLARE v_total DECIMAL(6,2) DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    IF p_details IS NULL OR JSON_TYPE(p_details) <> 'ARRAY' OR JSON_LENGTH(p_details) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La venta debe incluir al menos un libro';
    END IF;

    SET n = JSON_LENGTH(p_details);

    INSERT INTO sales (id_user, total)
    VALUES (p_id_user, 0);
    SET v_id_sale = LAST_INSERT_ID();

    WHILE i < n DO
        SET v_id_book = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_book')));
        SET v_json_type = JSON_TYPE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].id_book')));
        IF v_json_type IS NULL OR v_json_type <> 'INTEGER' OR v_id_book < 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El ID del libro debe ser un entero positivo';
        END IF;

        SET v_amount = JSON_UNQUOTE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].amount')));
        SET v_json_type = JSON_TYPE(JSON_EXTRACT(p_details, CONCAT('$[', i, '].amount')));

        IF v_json_type IS NULL OR v_json_type <> 'INTEGER' OR v_amount < 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad de libros debe ser mayor que cero';
        END IF;

        SELECT COUNT(*) INTO v_book_exists
        FROM books
        WHERE id_book = v_id_book;

        IF v_book_exists = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El libro no existe';
        END IF;

        SELECT price INTO v_unit_price
        FROM books
        WHERE id_book = v_id_book;

        INSERT INTO sale_details (id_sale, id_book, amount, unit_price)
        VALUES (v_id_sale, v_id_book, v_amount, v_unit_price);

        SET v_total = v_total + (v_amount * v_unit_price);
        SET i = i + 1;
    END WHILE;

    UPDATE sales
    SET total = v_total
    WHERE id_sale = v_id_sale;

    COMMIT;
    SELECT v_id_sale AS id_sale, v_total AS total;
END //
DELIMITER ;
