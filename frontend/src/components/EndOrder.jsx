import React from 'react';
import { Link } from 'react-router-dom';

function EndOrder() {
  return (
    <div className="thank-you-page text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-lg mb-6">We appreciate your business.</p>
      <Link to="/" className="text-blue-500 font-bold">
        {'< Back to Home'}
      </Link>
    </div>
  );
}

export default EndOrder;
