import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10 px-6 md:px-16 lg:px-28">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 pb-10 border-b border-gray-700">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">SAVS Tech</h3>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for cutting-edge gadgets, premium electronics, and unbeatable deals. Trusted by 10K+ shoppers worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
            <li><Link to="/cart" className="hover:text-blue-400 transition-colors">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Customer Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Order Tracking</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-3">Join Our Newsletter</h4>
          <p className="text-sm mb-4">Get exclusive offers & updates directly to your inbox.</p>
          <form className="flex w-full mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full rounded-l-full text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-full transition-colors"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-3 mt-3">
            <a href="#" className="bg-gray-700 hover:bg-blue-600 text-white p-3 rounded-full transition-transform hover:scale-105">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-pink-500 text-white p-3 rounded-full transition-transform hover:scale-105">
              <FaInstagram />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-sky-400 text-white p-3 rounded-full transition-transform hover:scale-105">
              <FaTwitter />
            </a>
            <a href="#" className="bg-gray-700 hover:bg-blue-500 text-white p-3 rounded-full transition-transform hover:scale-105">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer