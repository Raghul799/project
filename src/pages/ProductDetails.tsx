import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaTruck, FaUndo, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <div className="text-center text-2xl py-20 dark:text-white">Product not found</div>;

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          <div className="relative max-w-sm w-full flex justify-center">
    {/* Previous Button */}
    <button
      onClick={prevImage}
      className="absolute top-1/2 -translate-y-1/2 -left-12 z-20 
                 bg-gray-800 bg-opacity-80 text-white p-3 rounded-full shadow-md 
                 hover:bg-gray-700 hover:scale-110 transition"
    >
      <ChevronLeft size={20} />
    </button>

    {/* Product Image */}
    <img
      src={product.images[currentImageIndex]}
      alt={product.name}
      onClick={() => setIsPreviewOpen(true)}
      className="rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 object-contain cursor-pointer hover:scale-105 transition"
    />

    {/* Next Button */}
    <button
      onClick={nextImage}
      className="absolute top-1/2 -translate-y-1/2 -right-12 z-20 
                 bg-gray-800 bg-opacity-80 text-white p-3 rounded-full shadow-md 
                 hover:bg-gray-700 hover:scale-110 transition"
    >
      <ChevronRight size={20} />
    </button>
</div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-16 h-16 rounded-lg cursor-pointer border-2 object-cover hover:scale-105 transition ${
                  idx === currentImageIndex ? "border-blue-600" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* IMAGE PREVIEW MODAL */}
        <AnimatePresence>
          {isPreviewOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
              onClick={() => setIsPreviewOpen(false)}
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={product.images[currentImageIndex]}
                alt="Preview"
                className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg object-contain"
              />
              <button
                className="absolute top-5 right-5 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
                onClick={() => setIsPreviewOpen(false)}
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
        >
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{product.name}</h1>
          <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold mb-2">
            Best Seller
          </span>
          <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">Category: {product.category}</p>
          <p className="text-yellow-500 font-semibold mb-2">Rating: {product.rating} ⭐</p>
          <p className="text-3xl font-bold text-green-600 mb-4">₹{product.price.toLocaleString()}</p>

          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            {product.description || "Experience crystal clear audio with these premium headphones. Perfect for travel, workouts, and daily use with ergonomic comfort."}
          </p>

          {/* TRUST BADGES */}
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6 text-sm">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> In Stock - Limited units left</li>
            <li className="flex items-center gap-2"><FaTruck className="text-blue-500" /> Free Fast Delivery within 2-4 days</li>
            <li className="flex items-center gap-2"><FaUndo className="text-purple-500" /> Easy 7-day Returns & Replacement</li>
            <li className="flex items-center gap-2"><FaShieldAlt className="text-yellow-500" /> Secure Payments and 1-Year Warranty</li>
          </ul>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded shadow hover:opacity-90 transition"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded shadow hover:opacity-90 transition"
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;