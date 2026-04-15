import Image from "next/image";
import Link from "next/link";
import ShoppingCart from "../shop/components/shoppingCart";

export const metadata = {
  title: "About Us | Handcrafted Haven",
  description:
    "Learn about Handcrafted Haven's story, our commitment to quality craftsmanship, sustainable practices, and the artisans behind our unique handmade products.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFE6A7]">
      <section className="relative h-[150px] flex items-center justify-center bg-[#6F1D1B]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl">
            Preserving traditions, one handmade piece at a time
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-[#6F1D1B]"></h2>
          <ShoppingCart />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#6F1D1B] mb-4">
              Handcrafted with Heart
            </h2>
            <div className="w-20 h-1 bg-[#6F1D1B] mb-6" />
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in 2026, Handcrafted Haven is about preserving the art of
              craftsmanship.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Each piece in our collection is thoughtfully created by skilled
              artisans who pour their expertise, patience, and passion into
              every detail.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We partner directly with artisans from around the world, ensuring
              working conditions and sustainable practices.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/AboutUs.jpeg"
              alt="Artisan crafting wooden products"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#6F1D1B] mb-4">
            Our Values
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our values guide everything we do, from selecting materials to
            delivering your order
          </p>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We never compromise on quality. Each piece is inspected by hand to
            ensure it meets our exacting standards before it reaches your home.
          </p>
        </div>
      </section>

      <section className="bg-[#6F1D1B] py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Art of Handcraft
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Explore our collection and bring home something truly unique —
            crafted with care, built to last, and made just for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-white text-[#6F1D1B] rounded-md hover:bg-gray-100 transition-colors font-bold"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-white text-white rounded-md hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
