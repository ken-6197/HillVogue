"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";

export default function CartItemList() {
  const { cart } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.map((item, index) => (
        <CartItem
          key={item.id}
          item={item}
          isLast={index === cart.length - 1}
        />
      ))}
    </div>
  );
}