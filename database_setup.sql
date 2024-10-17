-- SECURITY: Ensure proper access controls are set up in your Supabase project

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category_id INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint
ALTER TABLE products
ADD CONSTRAINT fk_category
FOREIGN KEY (category_id)
REFERENCES categories(id)
ON DELETE SET NULL;

-- Create users table (if not already created by Supabase auth)
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    status VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create index for faster queries
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);

-- SECURITY: Create a secure function for inserting new products
CREATE OR REPLACE FUNCTION insert_product(
    p_name VARCHAR(255),
    p_description TEXT,
    p_price DECIMAL(10, 2),
    p_image_url VARCHAR(255),
    p_category_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
    new_id INTEGER;
BEGIN
    INSERT INTO products (name, description, price, image_url, category_id)
    VALUES (p_name, p_description, p_price, p_image_url, p_category_id)
    RETURNING id INTO new_id;
    
    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PERFORMANCE: Create a materialized view for product summaries
CREATE MATERIALIZED VIEW product_summaries AS
SELECT p.id, p.name, p.price, c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Create a function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_product_summaries()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY product_summaries;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to refresh the materialized view when products or categories are updated
CREATE TRIGGER refresh_product_summaries_trigger
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH STATEMENT EXECUTE FUNCTION refresh_product_summaries();

CREATE TRIGGER refresh_product_summaries_categories_trigger
AFTER INSERT OR UPDATE OR DELETE ON categories
FOR EACH STATEMENT EXECUTE FUNCTION refresh_product_summaries();

-- SECURITY: Create a row level security policy for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products are viewable by everyone"
ON products FOR SELECT
USING (true);

CREATE POLICY "Products can be inserted by authenticated users with proper role"
ON products FOR INSERT
TO authenticated
USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- CUSTOMIZATION: Add sample data
INSERT INTO categories (name, description) VALUES
('Electronics', 'Gadgets and devices'),
('Clothing', 'Apparel and accessories'),
('Books', 'Literature and educational materials');

INSERT INTO products (name, description, price, category_id) VALUES
('Smartphone', 'Latest model smartphone', 699.99, 1),
('T-shirt', 'Cotton t-shirt', 19.99, 2),
('Programming Book', 'Learn coding', 49.99, 3);

-- SECURITY: Remember to set up proper backup and recovery procedures for your database
-- PERFORMANCE: Regularly analyze and optimize your database queries and indexes
-- CUSTOMIZATION: Add more tables, views, and functions as needed for your specific e-commerce requirements