"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.replace("/welcome");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("welcome");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <Navbar />
      <div className="container mx-auto max-w-md px-6 py-12">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-semibold text-center mb-6">Sign In</h3>
          <hr className="border-gray-600 mb-6" />
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 w-fit text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              Sign In
            </button>
          </form>
          <hr className="border-gray-600 my-6" />
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
