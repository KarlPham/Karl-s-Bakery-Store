import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItems';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full">
    <div className="container pt-50 mx-auto p-6 px-20 items-center pl-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Product </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductItem key={product.productid} product={product} />
        ))}
      </div>
    </div>
  </div>
  );
}

export default ProductList;