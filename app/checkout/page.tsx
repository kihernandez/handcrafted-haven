'use client';

import { useCart } from '../shop/components/cartProvider';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing (we will connect this to our Neon databse later)
    setTimeout(() => {
      alert(`✅ Order placed successfully!\n\nThank you, ${formData.fullName}!\nTotal: $${totalPrice.toLocaleString()}\n\nYou will receive a confirmation email shortly.`);
      
      clearCart();                    // Clear cart after successful order
      window.location.href = '/';     // Redirect to home page
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EE]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#6F1D1B] mb-4">Your cart is empty</h2>
          <Link href="/shop" className="text-[#6F1D1B] underline">Go back to shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8EE] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-[#6F1D1B] text-center mb-12">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#6F1D1B]">Order Summary</h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-between text-2xl font-bold text-[#6F1D1B]">
                <span>Total Amount</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#6F1D1B]">Shipping Details</h2>
            
            <div className="space-y-5">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#6F1D1B]/30 rounded-lg focus:outline-none focus:border-[#6F1D1B]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#6F1D1B]/30 rounded-lg focus:outline-none focus:border-[#6F1D1B]"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#6F1D1B]/30 rounded-lg focus:outline-none focus:border-[#6F1D1B]"
              />
              <textarea
                name="address"
                placeholder="Delivery Address *"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-4 border border-[#6F1D1B]/30 rounded-lg focus:outline-none focus:border-[#6F1D1B]"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-4 border border-[#6F1D1B]/30 rounded-lg focus:outline-none focus:border-[#6F1D1B]"
              />
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="mt-10 w-full bg-[#6F1D1B] hover:bg-[#5a1716] disabled:bg-gray-400 text-white py-5 rounded-xl text-xl font-semibold transition"
            >
              {isSubmitting ? "Processing Order..." : "Place Order • ₦" + totalPrice.toLocaleString()}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Secure checkout powered by Handcrafted Haven
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}