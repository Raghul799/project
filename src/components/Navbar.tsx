import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaShoppingCart, FaCog } from 'react-icons/fa';
import Sidebar from './Sidebar';

interface NavbarProps {
  cartItemCount: number;
}

const Navbar = ({ cartItemCount }: NavbarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            <span className="mr-2"></span> SAVS Tech
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6 text-lg font-medium flex items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">Home</Link>
            <Link to="/products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">Products</Link>

            {/* Cart with Notification */}
            <Link to="/cart" className="relative flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
              <FaShoppingCart className="text-xl" />
              <span className="ml-1">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Settings Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition text-2xl ml-2"
              title="Settings"
            >
              <FaCog />
            </button>
          </div>
        </div>
      </nav>

      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
    </>
  );
};

export default Navbar;
