'use client';

import { useState } from 'react';
import { useCart } from './cartProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 bg-[#6F1D1B] text-white px-6 py-3 rounded-lg hover:bg-[#5a1716] font-medium"
      >
        Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full overflow-auto p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#6F1D1B]">Your Cart ({totalItems})</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-4xl text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-16 text-xl">Your cart is empty. Start shopping!</p>
            ) : (
              <>
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-5 border-b pb-6">
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.name}</h4>
                        <p className="text-xl font-bold mt-1">${(item.price * item.quantity).toLocaleString()}</p>

                        <div className="flex items-center gap-4 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 border border-[#6F1D1B] rounded text-xl hover:bg-[#FFE6A7]"
                          >
                            −
                          </button>
                          <span className="text-xl font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 border border-[#6F1D1B] rounded text-xl hover:bg-[#FFE6A7]"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t">
                  <div className="flex justify-between text-2xl font-bold text-[#6F1D1B]">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>

                  {/* Use Link + onClick to close sidebar */}
                  <Link 
                    href="/checkout"
                    onClick={() => setIsOpen(false)}
                    className="mt-6 block w-full bg-[#6F1D1B] hover:bg-[#5a1716] text-white py-4 rounded-xl text-lg font-semibold text-center transition"
                  >
                    Proceed to Checkout
                  </Link>

                  <button 
                    onClick={clearCart}
                    className="mt-4 w-full text-red-600 py-2 font-medium hover:underline"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}