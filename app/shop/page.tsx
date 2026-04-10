// export default function Page() {
//   return <div className="p-10 text-2xl">Shop</div>;
// }

'use client';

import ProductCard from './components/productCard';
import ShoppingCart from './components/shoppingCart';
import { useState } from 'react';




const handcraftedProducts = [
  { 
    id: 1, 
    name: "Hand-Carved Wooden Vase", 
    price: 39.99, 
    category: "Home Decor",
    image: "/wooden-vase.webp" 
  },
  { 
    id: 2, 
    name: "Ceramic Snowman Figurine", 
    price: 29.99, 
    image: "/snowman-figurine.webp",
    category: "Home Decor"
  },
  { 
    id: 3, 
    name: "Greek-inspired Beaded Bracelet", 
    price: 40.99, 
    category: "Jewelry",
    image: "/greek-bracelet.webp" 
  },
];



export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');

  const filteredProducts = handcraftedProducts
  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
  .filter(p => {
    if (priceRange === 'All') return true;
    if (priceRange === 'Under 10') return p.price < 10;
    if (priceRange === '10-30') return p.price >= 10 && p.price <= 30;
    if (priceRange === 'Above 30') return p.price > 30;
    return true;
  });

  
  return (
    <div className="min-h-screen bg-[#FFF8EE]">
      {/* Header */}
      <div className="bg-[#6F1D1B] text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Handcrafted Haven Shop</h1>
        <p className="text-xl max-w-2xl mx-auto">Discover unique pieces made with love by talented artisans</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 border border-[#6F1D1B]/30 rounded-xl"
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-3 border border-[#6F1D1B]/30 rounded-xl">
          <option value="All">All Categories</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Pottery">Pottery</option>
        </select>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="p-3 border border-[#6F1D1B]/30 rounded-xl">
          <option value="All">All Prices</option>
          <option value="Under 15000">Under ₦15,000</option>
          <option value="15000-30000">₦15,000 - ₦30,000</option>
          <option value="Above 30000">Above ₦30,000</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#6F1D1B]">All Handcrafted Treasures</h2>
          <ShoppingCart />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {handcraftedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}