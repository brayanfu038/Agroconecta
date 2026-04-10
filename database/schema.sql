-- =============================================
-- AGROCONECTA - Módulo: Productos y Fincas
CREATE DATABASE IF NOT EXISTS agroconecta;

USE agroconecta;

-- Tabla Finca
CREATE TABLE
    IF NOT EXISTS finca (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        direccion VARCHAR(200) NOT NULL,
        latitud DECIMAL(10, 8) NOT NULL,
        longitud DECIMAL(11, 8) NOT NULL,
        descripcion TEXT,
        productor_id INT NOT NULL,
        activa BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Tabla Producto
CREATE TABLE
    IF NOT EXISTS producto (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        cantidad_disponible INT NOT NULL DEFAULT 0,
        categoria VARCHAR(50),
        foto_url VARCHAR(255),
        unidad_medida VARCHAR(20) DEFAULT 'kg',
        finca_id INT NOT NULL,
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (finca_id) REFERENCES finca (id)
    );

-- Tabla HorarioAtencion
CREATE TABLE
    IF NOT EXISTS horario_atencion (
        id INT AUTO_INCREMENT PRIMARY KEY,
        finca_id INT NOT NULL,
        dia_semana ENUM (
            'lunes',
            'martes',
            'miercoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo'
        ) NOT NULL,
        hora_inicio TIME NOT NULL,
        hora_fin TIME NOT NULL,
        FOREIGN KEY (finca_id) REFERENCES finca (id)
    );