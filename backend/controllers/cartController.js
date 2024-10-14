const db = require('../db/database');

// Fetch all items in the cart
exports.getCartItems = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT c.cartItemId, p.name, p.price, p.image, c.quantity 
      FROM cartItems c
      JOIN products p ON c.productId = p.productId
    `);
    res.status(200).json(result.rows);  // Return all items in the cart
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Missing product or quantity information' });
  }

  try {
    // Get the product price
    const productResult = await db.query('SELECT price FROM products WHERE productId = $1', [productId]);
    const productPrice = productResult.rows[0].price;

    // Calculate total price
    const totalPrice = productPrice * quantity;

    // Insert into cartItems with calculated totalPrice
    const result = await db.query(
      `INSERT INTO cartItems (productId, quantity, totalPrice) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [productId, quantity, totalPrice]
    );
    res.status(201).json(result.rows[0]);  // Return the newly added cart item with totalPrice
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
};

// Delete a cart item by cartItemId
exports.deleteCartItem = async (req, res) => {
  const { cartItemId } = req.params;

  if (!cartItemId) {
    return res.status(400).json({ error: 'Missing cartItemId' });
  }

  try {
    const result = await db.query('DELETE FROM cartItems WHERE cartItemId = $1 RETURNING *', [cartItemId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};



// Clear the cart (optional)
exports.clearCart = async (req, res) => {
  try {
    console.log('Attempting to clear cart...');

    // Run the delete query
    await db.query(`DELETE FROM cartItems`);

    // If successful, send a success response
    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    // Log the error for debugging
    console.error('Error clearing cart:', err.message);  // Add error message logging
    res.status(500).json({ error: 'Failed to delete cart item', details: err.message });
  }
};

