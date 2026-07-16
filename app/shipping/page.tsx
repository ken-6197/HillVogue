"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ShippingPage() {
  const shippingMethods = [
    {
      icon: Truck,
      title: "Standard Shipping",
      time: "3-5 business days",
      price: "₹50",
      note: "Free on orders above ₹999",
    },
    {
      icon: Package,
      title: "Express Shipping",
      time: "1-2 business days",
      price: "₹150",
      note: "Available for select pin codes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
            Shipping
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shipping <span className="text-primary">Information</span>
          </h1>
          <p className="text-lg text-muted-foreground">
           
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-primary/10 shadow-xl backdrop-blur-sm bg-card/50">
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Shipping Methods */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  Shipping Methods
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {shippingMethods.map((method, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-primary/10 bg-background/30 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <method.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                      </div>
                      <div className="space-y-1 pl-11">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" />
                          {method.time}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {method.price}
                        </p>
                        <p className="text-xs text-primary">{method.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Shipping Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Shipping Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Order Processing</p>
                      <p className="text-sm text-muted-foreground">
                        Orders are processed within 1-3 business days. You will receive a confirmation 
                        email once your order is shipped.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Delivery Areas</p>
                      <p className="text-sm text-muted-foreground">
                        We ship to all locations across India. For remote areas, delivery may take 
                        additional 2-3 business days.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Important Notes</p>
                      <p className="text-sm text-muted-foreground">
                        Delivery times are estimates and may vary due to unforeseen circumstances 
                        like weather or courier delays. We strive to keep you updated on your order status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tracking */}
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">Track Your Order</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Once your order is shipped, you will receive a tracking number via email. 
                  You can use this number to track your package in real-time on our courier partner's website.
                </p>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact us at{" "}
                    <span className="text-primary">hello@hillvogue.com</span> or call{" "}
                    <span className="text-primary">+91 9233661750</span>
                  </p>
                </div>
              </div>

              <Separator />

              {/* Footer Note */}
              <div className="text-center text-xs text-muted-foreground space-y-2">
                <p>© 2026 HillVogue. All rights reserved.</p>
                <p>We're committed to delivering your tribal fashion with care.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}