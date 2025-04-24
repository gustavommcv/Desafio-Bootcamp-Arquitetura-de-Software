CREATE DATABASE IF NOT EXISTS bootcamp_desafio;
USE bootcamp_desafio;

CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    user_id CHAR(36) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    order_id CHAR(36) NOT NULL,
    product_id CHAR(36) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

INSERT INTO users (name, email, password) VALUES
('João Silva', 'joao.silva@email.com', '$2a$10$Xp1Q6JYbG5vJhH6fZ8sQnOe9V2BbCc1k7rR3d5E4F7gH2iJ3kL4mN'),
('Maria Oliveira', 'maria.oliveira@email.com', '$2a$10$Yq2R7KZcG6wHhI8g9sQnOe9V2BbCc1k7rR3d5E4F7gH2iJ3kL4mN'),
('Carlos Souza', 'carlos.souza@email.com', '$2a$10$Zr3S8LaD7xEi9F0g1sQnOe9V2BbCc1k7rR3d5E4F7gH2iJ3kL4mN'),
('Ana Pereira', 'ana.pereira@email.com', '$2a$10$As4T9MbE8yFj1G2h3sQnOe9V2BbCc1k7rR3d5E4F7gH2iJ3kL4mN'),
('Pedro Costa', 'pedro.costa@email.com', '$2a$10$Bt5U0NcF9vGk2H1i4sQnOe9V2BbCc1k7rR3d5E4F7gH2iJ3kL4mN');

INSERT INTO products (name, description, price) VALUES
('Notebook Dell XPS 15', 'Notebook de 15 polegadas com tela 4K, 16GB RAM, SSD 512GB', 8999.90),
('iPhone 14 Pro', 'Smartphone Apple com tela Super Retina XDR, 128GB', 7599.00),
('Samsung Galaxy S23 Ultra', 'Smartphone Android com câmera de 200MP, 256GB', 6899.90),
('Monitor LG UltraWide 34"', 'Monitor curvado 34 polegadas, WQHD, 144Hz', 3299.00),
('Teclado Mecânico Keychron K2', 'Teclado sem fio mecânico switch brown, layout 75%', 699.90),
('Mouse Logitech MX Master 3', 'Mouse sem fio ergonômico para produtividade', 799.00),
('Headset Sony WH-1000XM5', 'Fones de ouvido sem fio com cancelamento de ruído', 2499.90),
('Webcam Logitech C920', 'Webcam Full HD com microfone integrado', 599.00),
('SSD Samsung 1TB NVMe', 'SSD NVMe M.2 1TB, velocidades até 3500MB/s', 599.90),
('Dock USB-C Dell WD19', 'Dock station com 180W de potência, 8 portas', 1299.00);

-- Pedido 1
SET @order_id_1 = UUID();
INSERT INTO orders (id, user_id, total_amount) 
SELECT @order_id_1, id, 16398.80 FROM users WHERE email = 'joao.silva@email.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_1, id, 1, price FROM products WHERE name = 'Notebook Dell XPS 15';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_1, id, 1, price FROM products WHERE name = 'iPhone 14 Pro';

-- Pedido 2
SET @order_id_2 = UUID();
INSERT INTO orders (id, user_id, total_amount) 
SELECT @order_id_2, id, 6899.90 FROM users WHERE email = 'maria.oliveira@email.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_2, id, 1, price FROM products WHERE name = 'Samsung Galaxy S23 Ultra';

-- Pedido 3
SET @order_id_3 = UUID();
INSERT INTO orders (id, user_id, total_amount) 
SELECT @order_id_3, id, 4597.90 FROM users WHERE email = 'carlos.souza@email.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_3, id, 1, price FROM products WHERE name = 'Monitor LG UltraWide 34"';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_3, id, 1, price FROM products WHERE name = 'Teclado Mecânico Keychron K2';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_3, id, 1, price FROM products WHERE name = 'Mouse Logitech MX Master 3';

-- Pedido 4
SET @order_id_4 = UUID();
INSERT INTO orders (id, user_id, total_amount) 
SELECT @order_id_4, id, 3098.80 FROM users WHERE email = 'ana.pereira@email.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_4, id, 1, price FROM products WHERE name = 'Headset Sony WH-1000XM5';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_4, id, 1, price FROM products WHERE name = 'Webcam Logitech C920';

-- Pedido 5
SET @order_id_5 = UUID();
INSERT INTO orders (id, user_id, total_amount) 
SELECT @order_id_5, id, 1898.90 FROM users WHERE email = 'pedro.costa@email.com';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_5, id, 1, price FROM products WHERE name = 'SSD Samsung 1TB NVMe';

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT @order_id_5, id, 1, price FROM products WHERE name = 'Dock USB-C Dell WD19';
