import React from 'react';

function CartItem({ item, onItemDeleted }) {
  
  const handleDelete = () => {
    fetch(`http://localhost:5000/api/cart/${item.cartitemid}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Notify parent component to remove this item from the state
          onItemDeleted(item.cartitemid);
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  };

  return (
    <div className="flex justify-between items-center mb-4 border-b pb-4">
      <div className="flex items-center">
        <img
          src={`http://localhost:5000/${item.image}`}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="text-lg font-bold mr-4">${(item.price * item.quantity).toFixed(2)}</p>
        {/* Delete button */}
        <button
          onClick={handleDelete}  // Handle delete logic within CartItem
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
