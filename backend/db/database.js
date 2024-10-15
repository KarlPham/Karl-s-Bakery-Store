const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// SQL queries to drop tables if they exist
const dropProductsTable = 'DROP TABLE IF EXISTS products CASCADE;';
const dropCartItemsTable = 'DROP TABLE IF EXISTS cartItems CASCADE;';
const dropOrdersTable = 'DROP TABLE IF EXISTS orders CASCADE;';

// SQL queries to create tables
const createProductsTable = `
  CREATE TABLE IF NOT EXISTS products (
    productId SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    shortDescription TEXT NOT NULL,
    longDescription TEXT NOT NULL
  );
`;

const createCartItemsTable = `
  CREATE TABLE IF NOT EXISTS cartItems (
    cartItemId SERIAL PRIMARY KEY,
    productId INTEGER REFERENCES products(productId),
    quantity INTEGER NOT NULL,
    totalPrice NUMERIC
  );
`;

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    orderId SERIAL PRIMARY KEY,
    cartItemId INTEGER REFERENCES cartItems(cartItemId),
    name TEXT NOT NULL,
    creditCard TEXT NOT NULL,
    shippingAddress TEXT NOT NULL,
    sum NUMERIC NOT NULL
  );
`;

// Function to drop and recreate tables
async function setupDatabase() {
  try {
    await pool.query(dropProductsTable);
    await pool.query(dropCartItemsTable);
    await pool.query(dropOrdersTable);
    await pool.query(createProductsTable);
    await pool.query(createCartItemsTable);
    await pool.query(createOrdersTable);
    console.log('Tables dropped and recreated successfully.');
  } catch (err) {
    console.error('Error managing tables:', err);
  }
}

// Export the setup function and pool query function
module.exports = {
  setupDatabase,
  query: (text, params) => pool.query(text, params),
};
