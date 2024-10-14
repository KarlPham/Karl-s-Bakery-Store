import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';  // Import an icon if you want

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 w-full fixed top-0 left-0 z-50 flex justify-between items-center">
      <Link to="/">
      <h1 className="text-3xl"> Karl's Bakery Shop</h1>
      </Link>
      <Link to="/cart" className="text-white text-lg font-bold flex items-center">
        <FaShoppingCart className="mr-2" />
        Cart
      </Link>
    </header>
  );
}

export default Header;
