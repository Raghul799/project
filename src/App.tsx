// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Auth from "./pages/Auth";
import { UserProvider } from "./context/UserContext";
import { CartProvider, useCart } from "./context/CartContext"; // ✅ Import Cart Context

// ✅ Helper component to inject cartItemCount into Navbar
const AppWithCart = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItemCount} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppWithCart />
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
