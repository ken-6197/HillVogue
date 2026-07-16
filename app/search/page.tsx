"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/home/ProductCard";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// This is the component that uses useSearchParams()
function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    router.push("/search");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="container max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-base rounded-xl"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </form>
        </div>

        {/* Results */}
        {query ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Search Results for "{query}"
                </h1>
                <p className="text-muted-foreground">
                  {searchResults.length} {searchResults.length === 1 ? "product" : "products"} found
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  No products found
                </h2>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any products matching "{query}". Try adjusting your search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      router.push("/search");
                    }}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/shop">Browse All Products</Link>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Search for products
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a product name or keyword to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// This is the main page component that wraps SearchContent in a Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}