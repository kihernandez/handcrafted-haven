/**
 * Navbar component for Handcrafted Haven Website.
 * This component renders the navigation bar, including the logo, navigation links, and resposiveness for mobile devices with a hambutger menu.
 */

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarClient from './NavbarClient';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 shadow bg-[#6F1D1B] text-white relative z-50">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <Link href="/" className="text-2xl font-bold">
            Handcrafted Haven
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About Us</Link>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">
          <NavbarClient />
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button type="button"
          className="md:hidden relative w-8 h-8 flex flex-col justify-between items-center z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-3" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white rounded transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white rounded transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-3" : ""
            }`}
          />
        </button>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* SLIDING MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#6F1D1B] text-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col p-8 gap-6`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-medium hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          href="/shop"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-medium hover:text-gray-300"
        >
          Shop
        </Link>
        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
          className="text-lg font-medium hover:text-gray-300"
        >
          About Us
        </Link>
        <Link
          href="/sign-in"
          onClick={() => setMenuOpen(false)}
          className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#6F1D1B] transition text-center"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          onClick={() => setMenuOpen(false)}
          className="px-4 py-2 bg-white text-[#6F1D1B] rounded hover:bg-gray-200 transition text-center"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
}