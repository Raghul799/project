import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


const Cart = () => {
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <p className="text-xl font-semibold dark:text-white">Your cart is empty.</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="text-lg font-semibold dark:text-white">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  ₹{item.price.toLocaleString()}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  >
                    -
                  </button>
                  <span className="dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-lg font-semibold dark:text-white">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm mt-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold dark:text-white">
          Total: ₹{totalPrice.toLocaleString()}
        </p>
        <button
          onClick={clearCart}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          to="/checkout"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
