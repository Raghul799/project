import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user, loading } = useUser();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    alert("Payment Successful!");
    clearCart();
  };

  if (loading) {
    return <p className="text-center mt-10 dark:text-white">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <p className="text-xl font-semibold dark:text-white">
          Please login to proceed with checkout.
        </p>
        <Link
          to="/auth"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Login Now
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <p className="text-xl font-semibold dark:text-white">Your cart is empty.</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Checkout</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-3 rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold dark:text-white">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  ₹{item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-bold text-blue-600 dark:text-blue-400">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold dark:text-white">
          Total: ₹{totalPrice.toLocaleString()}
        </p>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
