import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    // Fetch cart items from the backend
    fetch('http://localhost/api/cart')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
        setError('Failed to fetch cart items');
      });
  }, []);

  // Function to remove item from cartItems state after deletion
  const handleItemDeleted = (cartItemId) => {
    setCartItems(cartItems.filter((item) => item.cartitemid !== cartItemId));
  };

  // Calculate total price for all cart items
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle Checkout button click
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');  // Navigate to the checkout page
    } else {
      alert('Your cart is empty!');  // Display an alert if the cart is empty
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white border border-pink-500 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6">My Cart</h2>

        {error && <p className="text-red-500">{error}</p>}

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem 
                key={item.cartitemid} 
                item={item} 
                onItemDeleted={handleItemDeleted}  // Pass the delete handler to CartItem
              />
            ))}
           
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleCheckout}  // Call handleCheckout when clicked
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartList;
