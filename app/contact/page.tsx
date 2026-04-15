import Link from "next/link";

export const metadata = {
  title: "Contact Us | Handcrafted Haven",
  description: "Get in touch with Handcrafted Haven. We'd love to hear from you about our handmade products, custom orders, or any questions you may have.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#FFE6A7]">
      <section className="relative h-[150px] flex items-center justify-center bg-[#6F1D1B]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
        
          <div>
            <h2 className="text-3xl font-bold text-[#6F1D1B] mb-4">
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-[#6F1D1B] mb-6" />
            <p className="text-gray-700 mb-8 leading-relaxed">
              Have a question about our handmade products? We&apos;d love to hear from you. 
              Reach out to us through any of the channels below or fill out the form.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#6F1D1B]/10 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-[#6F1D1B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#6F1D1B] text-lg">Email Us</h3>
                  <p className="text-gray-600">info@hand.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#6F1D1B]/10 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-[#6F1D1B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#6F1D1B] text-lg">Call Us</h3>
                  <p className="text-gray-600">1-800-666-0000</p>
                  <p className="text-gray-600">Mon-Fri, 9am - 6pm UTC</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#6F1D1B]/10 p-3 rounded-full">
                  <svg
                    className="w-6 h-6 text-[#6F1D1B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#6F1D1B] text-lg">Visit Us</h3>
                  <p className="text-gray-600">Kaarle, 20810 Turku, Finland</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-[#6F1D1B] text-lg mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="bg-[#6F1D1B]/10 p-2 rounded-full hover:bg-[#6F1D1B]/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6F1D1B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="bg-[#6F1D1B]/10 p-2 rounded-full hover:bg-[#6F1D1B]/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6F1D1B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.973 2h.342zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.339-9.87a1.2 1.2 0 10-.001 2.4 1.2 1.2 0 000-2.4z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="bg-[#6F1D1B]/10 p-2 rounded-full hover:bg-[#6F1D1B]/20 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#6F1D1B]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#6F1D1B] mb-6">Send us a Message</h3>

            <form
              action="/contact/confirmation"
              method="GET"
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#6F1D1B] mb-6">Send us a Message</h3>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6F1D1B] focus:border-transparent"
                  placeholder="Compliment and inquiry......"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6F1D1B] text-white py-3 rounded-md hover:bg-[#8B2E2C] transition-colors font-bold text-lg"
              >
                Send Message
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                We&apos;ll get back to you within 24-48 hours. (No actual message will be stored)
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}