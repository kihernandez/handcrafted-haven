import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Handcrafted Haven",
  description: "Beautiful handmade products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFE6A7] text-black">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-8 py-4 shadow bg-[#6F1D1B] text-white">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <Link href="/" className="text-2xl font-bold">
              Handcrafted Haven
            </Link>
          </div>

          <div className="flex gap-6">
            <Link href="/" className="hover:opacity-80">Home</Link>
            <Link href="/shop" className="hover:opacity-80">Shop</Link>
            <Link href="/about" className="hover:opacity-80">About Us</Link>
          </div>

          <div className="flex gap-4">
            <Link
              href="/signin"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#6F1D1B] transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-white text-[#6F1D1B] rounded hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#6F1D1B] text-white text-center py-6 mt-10 flex flex-col items-center gap-2">
          <p>Call us at (123) 456-7890</p>
          <p>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
        </footer>

      </body>
    </html>
  );
}
