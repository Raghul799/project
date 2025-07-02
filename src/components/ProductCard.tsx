
// src/components/ProductCard.tsx
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow transition p-4 flex flex-col cursor-pointer hover:shadow-xl duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain mb-4 rounded-lg transition-transform duration-300"
        />
      </Link>
      <h2 className="text-lg font-semibold mb-1 dark:text-white text-center">{product.name}</h2>
      <p className="text-blue-600 font-bold mb-3 text-center">₹{product.price.toLocaleString()}</p>
      <button
        onClick={handleBuyNow}
        className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-2 rounded-lg font-medium w-full"
      >
        Buy Now
      </button>
    </motion.div>
  );
};

export default ProductCard;
