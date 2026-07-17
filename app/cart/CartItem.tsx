"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  isLast: boolean;
}

export default function CartItem({ item, isLast }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!item || !item.id) {
    return null;
  }

  const handleProductClick = () => {
    router.push(`/product/${item.id}`);
  };

  const handleBuyNow = () => {
    const buyNowItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      total: item.price * item.quantity,
    };
    sessionStorage.setItem('buyNowItem', JSON.stringify(buyNowItem));
    router.push("/buy-now-checkout");
  };

  return (
    <div>
      <div className="flex items-start gap-4">
        {/* Clickable Image - wrapped in a div with onClick */}
        <div 
          onClick={handleProductClick}
          className="relative w-[100px] h-[100px] shrink-0 cursor-pointer"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="100px"
            className="rounded-lg object-cover bg-muted hover:opacity-80 transition-opacity"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              {/* Clickable Name */}
              <div 
                onClick={handleProductClick}
                className="cursor-pointer"
              >
                <h2 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                  {item.name}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formatPrice(item.price)} each
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(item.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
                className="h-8 w-8 rounded-r-none"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="px-4 py-2 min-w-[50px] text-center text-sm font-medium">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-8 w-8 rounded-l-none"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="text-right flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleBuyNow}
                className="text-xs"
              >
                Buy Now
              </Button>
              <span className="text-lg font-bold text-foreground">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!isLast && <Separator className="mt-4" />}
    </div>
  );
}