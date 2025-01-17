-- Crear la base de datos
CREATE DATABASE tourism_management;
\c tourism_management;

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de paquetes turísticos
CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    destination_id UUID NOT NULL,
    duration VARCHAR(100) NOT NULL,
    category VARCHAR(100),

    -- Fechas y disponibilidad
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    availability INT NOT NULL,
    booking_deadline DATE,
    discounts TEXT,

    -- Incluye
    accommodation VARCHAR(255),
    meals VARCHAR(255),
    transportation VARCHAR(255),
    tours TEXT,
    insurance BOOLEAN DEFAULT FALSE,
    guides TEXT,
    additional_services TEXT,

    -- No incluye
    excluded_items TEXT,

    -- Multimedia
    photos JSONB,
    videos JSONB,

    -- Ubicación y logística
    departure_location VARCHAR(255),
    return_location VARCHAR(255),
    meeting_points TEXT,
    itinerary TEXT,

    -- Atributos administrativos
    created_by UUID,
    status VARCHAR(50) DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Opcionales
    customizations TEXT,
    group_size VARCHAR(50),
    travel_restrictions TEXT,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla de mensajes de contacto
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
