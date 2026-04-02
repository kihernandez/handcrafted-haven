// export default function Page() {
//   return <div className="p-10 text-2xl">Shop</div>;
// }

'use client';

import ProductCard from './components/productCard';
import ShoppingCart from './components/shoppingCart';

const handcraftedProducts = [
  { 
    id: 1, 
    name: "Hand-Carved Wooden Vase", 
    price: 39.99, 
    image: "/wooden-vase.webp" 
  },
  { 
    id: 2, 
    name: "Ceramic Snowman Figurine", 
    price: 29.99, 
    image: "/snowman-figurine.webp" 
  },
  { 
    id: 3, 
    name: "Greek-inspired Beaded Bracelet", 
    price: 40.99, 
    image: "/greek-bracelet.webp" 
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FFF8EE]">
      {/* Header */}
      <div className="bg-[#6F1D1B] text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Handcrafted Haven Shop</h1>
        <p className="text-xl max-w-2xl mx-auto">Discover unique pieces made with love by talented artisans</p>
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