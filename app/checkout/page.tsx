'use client';

import { useCart } from '../shop/components/cartProvider';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in Full Name, Email and Address");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alert(`Order Placed Successfully!\n\nThank you ${formData.fullName}!\nTotal: $${totalPrice.toLocaleString()}`);
      clearCart();
      window.location.href = '/';
    }, 1500);
  };

  if (!isClient) return <div className="min-h-screen flex items-center justify-center text-xl">Loading checkout...</div>;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE6A7]">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
          <Link href="/shop" className="text-[#6F1D1B] underline mt-4 block">← Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFE6A7] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-[#6F1D1B] text-center mb-12">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 py-4 border-b last:border-none">
                <div className="relative w-20 h-20">
                  <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div className="mt-8 pt-6 border-t flex justify-between text-2xl font-bold text-[#6F1D1B]">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
            <div className="space-y-5">
              <input name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleInputChange} className="w-full p-4 border rounded-xl" />
              <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} className="w-full p-4 border rounded-xl" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="w-full p-4 border rounded-xl" />
              <textarea name="address" placeholder="Delivery Address *" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-4 border rounded-xl" />
              <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className="w-full p-4 border rounded-xl" />
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="mt-10 w-full bg-[#6F1D1B] text-white py-5 rounded-xl text-xl font-semibold hover:bg-[#5a1716]"
            >
              {isSubmitting ? "Processing Order..." : `Place Order for Total: $${totalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}