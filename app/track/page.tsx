"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Search,
  CheckCircle,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  // Sample order tracking data
  const trackingData = {
    orderId: "HV-2026-1024",
    status: "Shipped",
    estimatedDelivery: "July 22, 2026",
    items: [
      { name: "Rongmei Shawl", quantity: 1, price: "₹1,299" },
      { name: "Tangkhul Necklace", quantity: 2, price: "₹999" },
    ],
    total: "₹3,297",
    trackingHistory: [
      { status: "Order Placed", date: "July 15, 2026", time: "10:30 AM", completed: true },
      { status: "Order Confirmed", date: "July 15, 2026", time: "02:15 PM", completed: true },
      { status: "Shipped", date: "July 17, 2026", time: "09:00 AM", completed: true },
      { status: "Out for Delivery", date: "July 19, 2026", time: "08:30 AM", completed: false },
      { status: "Delivered", date: "Pending", time: "Pending", completed: false },
    ],
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSearched(true);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    switch (status) {
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "Out for Delivery":
        return <MapPin className="h-5 w-5 text-orange-500" />;
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Tracking
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Track Your <span className="text-primary">Order</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your order ID to track your package in real-time.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50 mb-8">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter order ID (e.g., HV-2026-1024)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="bg-background/50 border-primary/10 focus:border-primary/30 transition-all"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline ml-2">Track</span>
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                Enter your order ID from the confirmation email.
              </p>
            </CardContent>
          </Card>

          {/* Results */}
          {isSearched && (
            <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
              <CardContent className="p-6 md:p-8 space-y-6">
                {/* Order Summary */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="text-xl font-bold text-foreground">{trackingData.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-green-500/10 text-green-600 border-green-200">
                      {trackingData.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Tracking Progress */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Tracking Progress</h3>
                  <div className="space-y-1">
                    {trackingData.trackingHistory.map((step, index) => (
                      <div key={index} className="relative pl-8 pb-4 last:pb-0">
                        {/* Vertical line */}
                        {index < trackingData.trackingHistory.length - 1 && (
                          <div
                            className={`absolute left-3 top-5 w-0.5 h-full ${
                              step.completed ? "bg-green-500" : "bg-muted"
                            }`}
                          />
                        )}
                        {/* Icon */}
                        <div className="absolute left-0 top-0.5">
                          {getStatusIcon(step.status, step.completed)}
                        </div>
                        {/* Content */}
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <p className={`font-medium ${
                              step.completed ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {step.status}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {step.date} {step.date !== "Pending" && `· ${step.time}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Items & Total */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Order Summary</h3>
                  <div className="space-y-2">
                    {trackingData.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-foreground font-medium">{item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-bold text-foreground">{trackingData.total}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Delivery Info */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Estimated Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {trackingData.estimatedDelivery}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {trackingData.status === "Shipped" && "Your order is on its way!"}
                      {trackingData.status === "Out for Delivery" && "Your order is out for delivery today!"}
                      {trackingData.status === "Delivered" && "Your order has been delivered. Enjoy!"}
                    </p>
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  <p>Need help? Contact us at <span className="text-primary">hello@hillvogue.com</span></p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}