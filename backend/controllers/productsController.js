const db = require('../db/database');  // Assuming the database connection is already configured in database.js

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products');
    res.status(200).json(result.rows);  // Send back all products in JSON format
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await db.query('SELECT * FROM products WHERE productId = $1', [productId]);

    // Check if the product exists
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};