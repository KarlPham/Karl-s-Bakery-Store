const express = require('express');
const db = require('./db/database');  // Import the setupDatabase function
const importProducts = require('./db/importProducts');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
var corsOptions = {
  origin: "http://localhost"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/image', express.static(path.join(__dirname, 'image')));

// Routes
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Main function to setup the database, import products, and start the server
(async function () {
  try {
    // First, drop and recreate the tables
    await db.setupDatabase();

    // After that, import the products from the CSV
    await importProducts();
    console.log('Products imported successfully.');

    // Start the server after everything is done
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error setting up database or starting server:', err);
  }
})();
