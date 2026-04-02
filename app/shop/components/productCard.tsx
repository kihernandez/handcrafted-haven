'use client';

import Image from 'next/image';
import { useCart } from './cartProvider';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="border border-[#6F1D1B]/20 rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white">
      <div className="relative h-64">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover" 
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-xl text-[#6F1D1B] mb-1">{product.name}</h3>
        <p className="text-2xl font-bold text-[#6F1D1B]">${product.price.toLocaleString()}</p>
        
        <button 
          onClick={() => addToCart(product)}
          className="mt-6 w-full bg-[#6F1D1B] hover:bg-[#5a1716] text-white py-3 rounded-lg font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}