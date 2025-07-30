import React, { createContext, useContext, useState } from "react";
import type { Product } from "../api";

type CartItem = { product: Product; qty: number };

type CartContextType = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (productId: string) => void;
  update: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product) => {
    setItems((prev) => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const remove = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const update = (productId: string, qty: number) => {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, qty } : i));
  };

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext error");
  return ctx;
};
