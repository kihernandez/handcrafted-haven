"use client";

import { useCart } from "../components/cartProvider";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "../components/shoppingCart";
import { Product } from "@/app/types/Product";

type Review = {
  id: number;
  rating: number;
  comment: string;
  date: string;
};

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setProduct(null);

      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();

        const found = data.find((p) => p.id === parseInt(id as string));
        setProduct(found || null);

        const saved = localStorage.getItem(`reviews-${id}`);
        if (saved) {
          setReviews(JSON.parse(saved));
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const deleteReview = (reviewId: number) => {
    const updated = reviews.filter((r) => r.id !== reviewId);
    setReviews(updated);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EE]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#6F1D1B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-2xl text-[#6F1D1B]">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8EE]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600">Product Not Found</h2>
          <Link
            href="/shop"
            className="mb-6 inline-flex items-center text-[#6F1654] active:scale-95"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <button onClick={() => router.back()} className="mb-6 text-[#6F1D1B]">
        ← Back to Shop
      </button>

      <div className="fixed top-20 right-6 z-50">
        <ShoppingCart />
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative w-full h-[500px]">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-[#6F1D1B]">{product.name}</h1>

          {product.category && (
            <p className="text-sm text-gray-500 mt-2">
              Category: <span className="font-medium">{product.category}</span>
            </p>
          )}

          {product.description && (
            <p className="mt-4 text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

          <p className="text-3xl font-bold mt-6">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 w-full bg-[#6F1D1B] text-white py-4 hover:bg-[#df716f] active:scale-95 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-6">Reviews</h2>

      {reviews.map((review) => (
        <div key={review.id} className="border p-6 rounded-xl mb-6 bg-white">
          <div className="flex justify-between">
            <div>Rating: {review.rating} ★</div>
            <button
              onClick={() => deleteReview(review.id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
          <p className="mt-3">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
