"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Globe,
  Shield,
  Award,
  Leaf,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Handcrafted with Love",
      description:
        "Every piece is handcrafted by skilled artisans from the hill tribes of Northeast India, preserving centuries-old traditions.",
    },
    {
      icon: Users,
      title: "Supporting Artisans",
      description:
        "We work directly with tribal communities across Manipur, ensuring fair wages and sustainable livelihoods for indigenous craftspeople.",
    },
    {
      icon: Globe,
      title: "Cultural Preservation",
      description:
        "We are dedicated to preserving and promoting the rich cultural heritage of Manipur's collective hill tribes through fashion.",
    },
    {
      icon: Shield,
      title: "Authentic & Genuine",
      description:
        "Every product is 100% authentic, sourced directly from tribal artisans and communities across Northeast India.",
    },
    {
      icon: Leaf,
      title: "Sustainable & Ethical",
      description:
        "We use natural, eco-friendly materials and sustainable practices to protect the environment and support local communities.",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description:
        "Each piece is carefully crafted with attention to detail, ensuring the highest quality and durability.",
    },
  ];

  const milestones = [
    { year: "2024", title: "HillVogue Founded", description: "Born from a vision to celebrate Manipur's tribal fashion heritage" },
    { year: "2025", title: "First Artisan Partnership", description: "Collaborated with tribal artisans across Manipur" },
    { year: "2026", title: "Expanded Collection", description: "Added jewelry, accessories, and contemporary tribal fashion" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary text-white">Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Where <span className="text-primary">Hill</span> Heritage Meets <br />
              <span className="text-primary">Modern Vogue</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              HillVogue brings you the beauty of Manipur's hill tribes through thoughtfully crafted fashion, jewelry, and accessories. Each piece is made by hand, rooted in tradition, and designed for the modern wardrobe.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* Our Mission */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Bringing <span className="text-primary">Tribal Fashion</span> to the World
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                HillVogue was founded with a simple yet powerful mission: to connect the world 
                with the authentic tribal fashion of Manipur's tribe & communities. We believe that 
                every handcrafted piece carries a story worth sharing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From traditional attire to contemporary jewelry and accessories, 
                we create a platform for tribal artisans to showcase their artistry 
                while preserving the rich cultural tapestry of Northeast India.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-sm text-muted-foreground">Tribal Communities</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Artisans Supported</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Products Curated</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center p-8">
                <div className="text-center">
                  <Heart className="h-24 w-24 text-primary/40 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground">"Crafted by Tradition, Designed for Vogue"</p>
                  <p className="text-sm text-muted-foreground">— Team HillVogue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">What We Stand For</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-muted-foreground">
              These principles guide everything we do at HillVogue, from sourcing to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The HillVogue <span className="text-primary">Story</span>
            </h2>
            <p className="text-muted-foreground">
              How we started and where we're headed.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card className="border-primary/10 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-primary text-white">{milestone.year}</Badge>
                          <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0 z-10">
                    {index + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Join Us on This <span className="text-primary">Journey</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Support authentic tribal craftsmanship and be part of preserving 
                Manipur's rich cultural heritage with HillVogue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Explore Our Collection
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}