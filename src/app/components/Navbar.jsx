"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function Navbar({ session }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Sign In", href: "/login" },
    { label: "Sign Up", href: "/register" },
  ];

  const handleProfileClick = () => {
    router.push("/welcome");
  };

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
            {/* ปุ่ม Sign In / Sign Up (เฉพาะตอนยังไม่ได้ login) */}
            {navItems.map((item) => (
              <li key={item.href} className={!session ? "" : "hidden"}>
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

            {/* ปุ่ม Profile (เหมือนปุ่ม Logout) */}
            {session && (
              <li>
                <button
                  onClick={handleProfileClick}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Profile
                </button>
              </li>
            )}

            {/* ปุ่ม Logout */}
            {session && (
              <li>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
