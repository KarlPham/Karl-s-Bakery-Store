import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <div className="product-card border border-pink-500 rounded-lg shadow-lg p-4">
      <img
        src={`http://localhost/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 text-lg mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-600 mb-6">{product.shortdescription}</p>
      
      <Link to={`/product/${product.productid}`}>
        <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700">
          More Details
        </button>
      </Link>
    </div>
  );
}

export default ProductItem;