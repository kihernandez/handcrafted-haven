// app/contact/confirmation/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Message Sent | Handcrafted Haven",
  description:
    "Your message has been sent to Handcrafted Haven. We'll get back to you within 24-48 hours.",
};

export default function ContactConfirmationPage() {
  return (
    <div className="bg-[#FFE6A7] min-h-screen">
      <section className="relative h-[150px] flex items-center justify-center bg-[#6F1D1B]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Message Sent</h1>
          <p className="text-xl md:text-2xl">
            Thanks for reaching out
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
          {/* Checkmark icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#6F1D1B] mb-4">
            We've received your message!
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Thank you for contacting Handcrafted Haven. Our team has received
            your inquiry and will get back to you within 24-48 hours.
          </p>

          <div className="bg-[#FFE6A7] p-4 rounded-lg mb-8">
            <p className="text-[#6F1D1B] font-medium">
              📬 While you wait, check your inbox for a confirmation email.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-[#6F1D1B] text-white rounded-md hover:bg-[#8B2E2C] transition-colors font-bold"
            >
              Return Home
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-[#6F1D1B] text-[#6F1D1B] rounded-md hover:bg-[#6F1D1B]/10 transition-colors font-bold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}