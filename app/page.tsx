import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative h-[500px] flex items-center px-12">
        <Image
          src="/hero-image.jpg"
          alt="Hero"
          fill
          className="absolute inset-0 object-cover opacity-60"
        />
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-bold mb-4 text-[#6F1D1B]">
            Artistry in Every Detail
          </h1>
          <p className="text-lg mb-6">
            Simple forms, rich tones, and handcrafted quality you can feel.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-[#6F1D1B] text-white rounded hover:bg-[#5a1716]"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="px-12 py-16 bg-[#FFE6A7]">
        <h2 className="text-3xl font-bold mb-8 text-[#6F1D1B] text-center">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
            <Image
              src="/snowman-figurine.webp"
              alt="Snowman Figurine"
              width={400}
              height={300}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-black">Snowman Figurine</h3>
            <p className="text-gray-700">$29.99</p>
          </div>

          <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
            <Image
              src="/wooden-vase.webp"
              alt="Vase"
              width={400}
              height={300}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-black">Wooden Vase</h3>
            <p className="text-gray-700">$39.99</p>
          </div>

          <div className="border p-4 rounded shadow hover:shadow-lg transition bg-white">
            <Image
              src="/greek-bracelet.webp"
              alt="Bracelet"
              width={400}
              height={300}
              className="h-40 w-full object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-black">Greek Bracelet</h3>
            <p className="text-gray-700">$49.99</p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-12 py-16 bg-background">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-2">Quality Craftsmanship</h3>
            <p>Every product is handmade with care.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Eco-Friendly</h3>
            <p>We use sustainable materials.</p>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2">Fast Shipping</h3>
            <p>Delivered quickly and safely.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
