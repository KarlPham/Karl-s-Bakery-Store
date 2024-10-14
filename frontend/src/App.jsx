import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // Assuming Header has the cart icon
import ProductList from './components/ProductList';  // Component for listing products
import ProductAddCart from './components/ProductAddCart';  // Detailed view of a single product
import CartList from './components/CartList';  // Component for showing items in the cart
import Checkout from './components/CheckOut';
import EndOrder from './components/EndOrder';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />       
        <main className="container mx-auto p-4 pt-24 w-screen">
          <Routes>
            <Route path="/" element={<ProductList />} />

        
            <Route path="/product/:productId" element={<ProductAddCart />} />

           
            <Route path="/cart" element={<CartList />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/end" element={<EndOrder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;