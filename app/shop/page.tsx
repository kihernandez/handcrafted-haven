"use client";

import { useState, useEffect } from "react";
import ProductCard from "./components/productCard";
import ShoppingCart from "./components/shoppingCart";
import { Product } from "@/app/types/Product";
import { PRODUCT_CATEGORIES } from "@/lib/categories";


export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(
      (p) => selectedCategory === "All" || p.category === selectedCategory,
    )
    .filter((p) => {
      if (priceRange === "All") return true;
      if (priceRange === "Under 15") return p.price < 15;
      if (priceRange === "15-30") return p.price >= 15 && p.price <= 30;
      if (priceRange === "Above 30") return p.price > 30;
      return true;
    });

  return (
    <div className="min-h-screen bg-[#FFF8EE]">
      {/* Header */}
      <div className="bg-[#6F1D1B] text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Handcrafted Haven Shop</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover unique pieces made with love by talented artisans
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 px-6 mt-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border border-[#6F1D1B]/30 rounded-xl"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-[#6F1D1B]/30 rounded-xl"
        >
          <option value="All">All Categories</option>

          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="p-3 border border-[#6F1D1B]/30 rounded-xl"
        >
          <option value="All">All Prices</option>
          <option value="Under 15">Under $15</option>
          <option value="15-30">$15 - $30</option>
          <option value="Above 30">Above $30</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#6F1D1B]">
            All Handcrafted Treasures
          </h2>
          <ShoppingCart />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full py-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#6F1D1B] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#6F1D1B] text-xl font-medium">
                Loading handcrafted treasures...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center col-span-full py-12">No products found</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
