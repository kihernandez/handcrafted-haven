-- 1. Create Sellers Table
CREATE TABLE sellers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create Customers Table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create Products Table
-- image_url defaults to placeholder
-- seller_id is optional
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT NOT NULL DEFAULT '/images/placeholder.jpg',
  seller_id INTEGER REFERENCES sellers(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Insert Demo Seller
INSERT INTO sellers (name, email, bio, avatar_url)
VALUES ('Demo Seller', 'demo@seller.com', 'This is a demo seller for sample products.', '/images/placeholder.jpg');

-- 5. Insert Demo Products (14 items)
INSERT INTO products (name, price, description, category, image_url, seller_id)
VALUES
('Vanilla Candle', 12.99, 'Hand-poured vanilla scented candle.', 'Candles', '/images/vanilla_candle.jpg', 1),
('Bergamot Candle', 13.99, 'Refreshing bergamot aroma candle.', 'Candles', '/images/bergamot_candle.jpg', 1),
('Yarn Wall Hanging', 24.99, 'Handmade yarn wall decor piece.', 'Home Decor', '/images/wall_hanging.jpg', 1),
('Crochet Plushie Gray', 18.99, 'Soft gray crochet plushie.', 'Plushies', '/images/crochet_plushie_gray.jpg', 1),
('Crochet Plushie Yellow', 18.99, 'Bright yellow crochet plushie.', 'Plushies', '/images/crochet_plushie_yellow.jpg', 1),
('Lion Keychain', 7.99, 'Cute lion-themed handmade keychain.', 'Accessories', '/images/lion_keychain.jpg', 1),
('Dragon Keychain', 8.99, 'Handmade dragon keychain with detailed design.', 'Accessories', '/images/dragon_keychain.jpg', 1),
('Handmade Soap Lime', 5.99, 'Fresh lime-scented handmade soap.', 'Bath & Body', '/images/soap_lime.jpg', 1),
('Handmade Soap Peppermint', 5.99, 'Cooling peppermint handmade soap.', 'Bath & Body', '/images/soap_peppermint.jpg', 1),
('Clay Earrings', 11.99, 'Handcrafted clay earrings.', 'Jewelry', '/images/clay_earrings_white.jpg', 1),
('Clear Earrings', 10.99, 'Minimalist clear resin earrings.', 'Jewelry', '/images/clear_earrings.jpg', 1),
('Knitted Scarf Gray', 29.99, 'Cozy gray knitted scarf.', 'Clothing', '/images/knitted_scarf.jpg', 1),
('Knitted Beanie Gray', 19.99, 'Warm gray knitted beanie.', 'Clothing', '/images/knitted_beanie.jpg', 1),
('Greek Bracelet', 14.99, 'Handmade bracelet with Greek-inspired design.', 'Jewelry', '/images/greek_bracelet.webp', 1);
