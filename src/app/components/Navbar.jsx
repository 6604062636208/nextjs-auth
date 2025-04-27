"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Sign In", href: "/login" },
    { label: "Sign Up", href: "/register" },
  ];

  return (
    <nav className="bg-[#1f2937]/90 text-white shadow-md backdrop-blur-lg border-b border-gray-700">
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              NextAuth
            </Link>
          </div>
          <ul className="flex space-x-6 text-base font-medium">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-blue-400 underline underline-offset-4"
                      : "hover:text-gray-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
