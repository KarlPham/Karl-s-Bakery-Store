import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);  // Store cart items
  const [totalCost, setTotalCost] = useState(0);   // Total cost calculated in frontend
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCard: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch cart items from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/cart')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);

          // Calculate total cost
          const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
          setTotalCost(total);
        } else {
          console.error('Failed to fetch cart items:', data.error);
        }
      })
      .catch((error) => console.error('Error fetching cart items:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form validation
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name required';
    if (!formData.address) formErrors.address = 'Address required';
    if (!formData.creditCard) formErrors.creditCard = 'Credit Card required';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // Function to clear the cart after placing the order
  const clearCart = () => {
    fetch('http://localhost:5000/api/cart/delete', {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cart cleared:', data);
      })
      .catch((error) => {
        console.error('Error clearing cart:', error);
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form from submitting the default way
    if (validateForm()) {
      // Prepare order data
      const orderData = {
        name: formData.name,
        shippingAddress: formData.address,
        creditCard: formData.creditCard,
        totalCost: totalCost  // Send totalCost calculated in frontend
      };

      // Send the order to the backend
      fetch('http://localhost:5000/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error('Error placing order:', data.error);
          } else {
            console.log('Order placed:', data);
            clearCart();  // Clear the cart after placing the order
            navigate('/end');  // Redirect after successful order
          }
        })
        .catch((error) => {
          console.error('Error placing order:', error);
        });
    }
  };

  return (
    <div className="checkout-form border border-pink-500 rounded-lg p-6 mx-auto">
      <Link to="/cart" className="text-blue-500 font-bold mb-4 block">{'< Back to Cart'}</Link>
      <h2 className="text-3xl font-bold mb-6">Check</h2>
      <h3 className="text-2xl mb-4">Total Cost: ${totalCost.toFixed(2)}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-lg">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-lg">Credit Card Number:</label>
          <input
            type="text"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
          />
          {errors.creditCard && <p className="text-red-500">{errors.creditCard}</p>}
        </div>

        <button
          type="submit"  // Let the form handle submission
          className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 mt-4"
        >
          Complete Form
        </button>
      </form>
    </div>
  );
}

export default Checkout;
