const db = require('../db/database');



// Add a new order
exports.createOrder = async (req, res) => {
  const { name, creditCard, shippingAddress, totalCost } = req.body;

  // Check if all required fields are present
  if (!name || !creditCard || !shippingAddress || totalCost === undefined) {
    return res.status(400).json({ error: 'Missing required order information' });
  }

  try {
    // Insert the order details into the orders table
    const result = await db.query(`
      INSERT INTO orders (name, creditCard, shippingAddress, sum)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, creditCard, shippingAddress, totalCost]
    );

    // Return the newly created order
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};



// Get order by ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await db.query(`SELECT * FROM orders WHERE orderId = $1`, [orderId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};
