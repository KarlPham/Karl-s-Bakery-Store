import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductAddCart() {
  const { productId } = useParams();  // Get productId from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch product data by productId from the backend
    fetch(`http://localhost/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    fetch('http://localhost/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage('Product added to cart successfully!');
        }
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        setMessage('Failed to add product to cart.');
      });
  };

  return (
    <div className="extended-product-view border border-pink-500 rounded-lg p-4 h-400 mx-auto ">
      <Link to="/" className="text-blue-500 font-bold mb-4 block">{'< Return to Catalog'}</Link>

      <div className="flex flex-col lg:flex-row items-start lg:items-center ">
        <img
          src={`http://localhost/${product.image}`}
          alt={product.name}
          className="w-full lg:w-1/3 h-48 object-cover mb-4 rounded-lg"
        />
        
        <div className="lg:ml-6">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.shortdescription}</p>

          {/* Quantity selector */}
          <div className="mb-4">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="border p-2 rounded-lg w-16"
            />
          </div>

          <button 
            className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          {/* Display success or error message */}
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600">{product.longdescription}</p>
      </div>
    </div>
  );
}

export default ProductAddCart;
