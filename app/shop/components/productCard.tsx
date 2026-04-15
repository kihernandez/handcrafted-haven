"use client";

import Image from "next/image";
import { useCart } from "./cartProvider";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { Product } from "@/app/types/Product";

type Review = {
  id: number;
  rating: number;
  comment: string;
  date: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Load reviews from localStorage
  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = localStorage.getItem(`reviews-${product.id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    };

    loadReviews();
  }, [product.id]);

  // Save reviews to localStorage
  useEffect(() => {
    const saveReviews = () => {
      localStorage.setItem(`reviews-${product.id}`, JSON.stringify(reviews));
    };

    saveReviews();
  }, [reviews, product.id]);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : "0.0";

  const handleSubmitReview = () => {
    if (!newComment.trim()) return;

    const review: Review = {
      id: Date.now(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString(),
    };

    setReviews((prev) => [review, ...prev]);
    setNewComment("");
    setNewRating(5);
    setShowReviewModal(false);

    alert("Thank you for your review!");
  };

  return (
    <>
      <div className="border border-[#6F1D1B]/20 rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white">
        <div className="relative h-64">
          <Image
            src={product.image_url || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="p-5">
          <Link
            href={`/shop/${product.id}`}
            className="font-semibold text-xl text-[#6F1D1B] hover:bg-[#FFE6A7]"
          >
            {product.name}
          </Link>

          {/* Rating Display */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={
                    i < Math.floor(Number(averageRating))
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating} ({reviews.length} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-[#6F1D1B]">
            ${product.price.toLocaleString()}
          </p>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#6F1D1B] hover:bg-[#FFE6A7] active:scale-95 transition-all text-white py-3 rounded-lg font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 border border-[#6F1D1B] hover:bg-[#FFE6A7] text-[#6F1D1B] py-3 rounded-lg font-medium transition"
            >
              Write Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-[#6F1D1B] mb-6">
              Review &quot;{product.name}&quot;
            </h2>

            {/* Star Rating Selector */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Rating</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-4xl transition"
                  >
                    <Star
                      size={42}
                      fill={(hoverRating || newRating) > i ? "#FACC15" : "none"}
                      stroke={
                        (hoverRating || newRating) > i ? "#FACC15" : "#6F1D1B"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="w-full h-32 p-4 border border-[#6F1D1B]/30 rounded-xl focus:outline-none focus:border-[#6F1D1B] resize-y"
            />

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={!newComment.trim()}
                className="flex-1 py-3 bg-[#6F1D1B] hover:bg-[#5a1716] text-white rounded-xl font-medium disabled:bg-gray-300"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
