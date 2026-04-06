/** 
 * Home Page for Handcrafted Haven
 * This component renders the main landing page of the website, showcasing the hero section, top products, reasons to join, and customer testimonials.
 */

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
          loading="eager"
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
        <h2 className="text-3xl font-bold mb-8 text-[#6F1D1B] text-center">
          Top Products
        </h2>
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
      <section className="px-42 py-16 bg-white text-background">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/quality-star.webp"
              alt="Star"
              width={400}
              height={300}
              className="h-30 w-30 rounded mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">
              Quality Craftsmanship
            </h3>
            <p>Every product is handmade with care.</p>
          </div>
          <div>
            <Image
              src="/eco-friendly.webp"
              alt="Plant"
              width={400}
              height={300}
              className="h-30 w-30 rounded mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">Eco-Friendly</h3>
            <p>We use sustainable materials.</p>
          </div>
          <div>
            <Image
              src="/delivery-truck.webp"
              alt="Delvery Truck"
              width={400}
              height={300}
              className="h-30 w-30 rounded mb-4"
            />
            <h3 className="font-semibold text-xl mb-2">Fast Shipping</h3>
            <p>Delivered quickly and safely.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-12 py-16 bg-[#FFE6A7]">
        <h2 className="text-3xl font-bold mb-8 text-[#6F1D1B] text-center">
          Join Our Community
        </h2>

        <h3 className="text-lg font-bold mb-8 text-[#6F1D1B] text-center">
          Hear from Our Customers
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          {/* LEFT: IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/customers.webp"
              alt="Happy customers"
              width={400}
              height={300}
              loading="eager"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* RIGHT: REVIEWS */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* REVIEW 1 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-[#6F1D1B]-500 text-lg">★★★★★</div>
              <p className="italic text-[#6F1D1B]">
                &quot;I love the quality and uniqueness of the products. Highly
                recommend!&quot;
              </p>
              <p className="font-semibold mt-2">– John D.</p>
            </div>

            {/* REVIEW 2 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-[#6F1D1B]-500 text-lg">★★★★☆</div>
              <p className="italic text-[#6F1D1B]">
                &quot;The craftsmanship is amazing. I get compliments every time
                I wear my bracelet!&quot;
              </p>
              <p className="font-semibold mt-2">– Sarah K.</p>
            </div>

            {/* REVIEW 3 */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-[#6F1D1B]-500 text-lg">★★★★★</div>
              <p className="italic text-[#6F1D1B]">
                &quot;Fast shipping and excellent customer service. Will buy
                again!&quot;
              </p>
              <p className="font-semibold mt-2">– Emily R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
