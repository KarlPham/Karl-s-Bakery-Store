const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');  // Import Pool from pg
require('dotenv').config({ path: '../.env' });  // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL  // Use DATABASE_URL to connect
});

console.log('Connecting to database with:', process.env.DATABASE_URL);

const filePath = './db/products1.csv';  // Path to your CSV file

// Define the importProducts function
const importProducts = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        const { name, price, image, shortDescription, longDescription } = row;
        console.log(row);

        const sql = `
          INSERT INTO products (name, price, image, shortDescription, longDescription)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [name, price, image, shortDescription, longDescription];

        try {
          await pool.query(sql, values);  // Use pool to query
          console.log(`Inserted product: ${name}`);
        } catch (err) {
          console.error('Error inserting product:', err);
          reject(err);  // Reject the promise if there is an error
        }
      })
      .on('end', () => {
        console.log('Finished importing all products from CSV');
        resolve();  // Resolve the promise when done
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
        reject(err);  // Reject the promise if there is an error with the CSV file
      });
  });
};

// Export the importProducts function
module.exports = importProducts;
