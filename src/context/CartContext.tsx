// src/context/CartContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { toast } from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.success(`${product.name} quantity increased.`);
    } else {
      toast.success(`${product.name} added to cart.`);
    }
  };

  const removeFromCart = (id: number) => {
    const removedItem = cart.find((item) => item.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (removedItem) {
      toast.success(`${removedItem.name} removed from cart.`);
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared.");
  };

  const incrementQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    const updatedItem = cart.find((item) => item.id === id);
    if (updatedItem) {
      toast.success(`Increased quantity of ${updatedItem.name}.`);
    }
  };

  const decrementQuantity = (id: number) => {
    const item = cart.find((item) => item.id === id);

    if (item) {
      if (item.quantity > 1) {
        setCart((prev) =>
          prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
        toast.success(`Decreased quantity of ${item.name}.`);
      } else {
        setCart((prev) => prev.filter((i) => i.id !== id));
        toast.success(`${item.name} removed from cart.`);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
