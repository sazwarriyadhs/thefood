-- Skema untuk aplikasi Serenity Food and Delivery

-- Ekstensi untuk menghasilkan UUID jika diperlukan (opsional, menggunakan SERIAL untuk kesederhanaan)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum untuk peran pengguna
CREATE TYPE user_role AS ENUM ('customer', 'restaurant_owner', 'courier', 'admin');

-- Tabel untuk menyimpan informasi pengguna
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role user_role NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel untuk menyimpan informasi restoran
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address TEXT,
    latitude DECIMAL(9, 6),
    longitude DECIMAL(9, 6),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel untuk menyimpan item menu dari setiap restoran
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enum untuk status pesanan
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled');

-- Tabel untuk menyimpan pesanan dari pelanggan
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    courier_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    status order_status NOT NULL DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel perantara untuk menghubungkan pesanan dengan item menu (many-to-many)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_order DECIMAL(10, 2) NOT NULL
);

-- Indeks untuk meningkatkan performa query
CREATE INDEX idx_restaurants_category ON restaurants(category);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_restaurant_id ON orders(restaurant_id);
CREATE INDEX idx_orders_courier_id ON orders(courier_id);
CREATE INDEX idx_menu_items_restaurant_id ON menu_items(restaurant_id);

-- Fungsi untuk memperbarui kolom updated_at secara otomatis
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk tabel users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Trigger untuk tabel restaurants
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON restaurants
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Trigger untuk tabel menu_items
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON menu_items
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Trigger untuk tabel orders
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Contoh data (opsional, bisa di-uncomment untuk pengujian)
/*
INSERT INTO users (full_name, email, password_hash, role) VALUES
('Budi Santoso', 'budi.customer@example.com', 'hashed_password', 'customer'),
('Rina Permata', 'rina.owner@example.com', 'hashed_password', 'restaurant_owner'),
('Agus Wijaya', 'agus.courier@example.com', 'hashed_password', 'courier');

INSERT INTO restaurants (owner_id, name, category, address) VALUES
(2, 'Sari Nusantara', 'Masakan Indonesia', 'Jl. Merdeka No. 10, Bogor');

INSERT INTO menu_items (restaurant_id, name, price) VALUES
(1, 'Nasi Goreng Spesial', 25000.00),
(1, 'Sate Ayam', 30000.00);
*/

-- Pesan akhir
\echo 'Skema database Serenity berhasil dibuat.'
