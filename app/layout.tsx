/**
 * Root Layout for the Handcrafted Haven Website.
 * This component defines the overall structure of the website, including the navbar, main content area, and footer.
 */

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar"; 

export const metadata = {
  title: "Handcrafted Haven",
  description: "Beautiful handmade products",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col text-black">
        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-grow">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#6F1D1B] text-white px-8 py-8 mt-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Handcrafted Haven</h2>
              <div className="flex gap-4">
                <Link href="https://www.facebook.com" target="_blank">
                  <Image
                    src="/facebook-icon.png"
                    alt="Facebook"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://www.instagram.com" target="_blank">
                  <Image
                    src="/instagram-icon.png"
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://www.twitter.com" target="_blank">
                  <Image
                    src="/twitter-icon.png"
                    alt="Twitter"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-2 text-left md:text-right">
              <h3 className="text-lg font-semibold">Need Help?</h3>
              <p>
                <strong>Phone:</strong> 1-800-666-0000
              </p>
              <p>
                <strong>Email:</strong> info@hand.org
              </p>
              <p>
                <strong>Address:</strong> Kaarle, 20810 Turku, Finland
              </p>
              <p>
                <strong>WDD 430: Class Project</strong>
              </p>
            </div>
          </div>
          <div className="border-t border-white/30 mt-6 pt-4 text-center text-sm">
            © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
