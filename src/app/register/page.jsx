"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();
  if (session) redirect("/welcome");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    // Add your registration logic here
    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }
    try {
      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resCheckUser.json();
      if (user) {
        setError("User already exists!");
        return;
      }
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("User registered successfully!");
        form.reset();
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <Navbar />
      <div className="container mx-auto max-w-md px-6 py-12">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-3xl font-semibold text-center mb-6">
            Create Account
          </h3>
          <hr className="border-gray-600 mb-6" />
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 w-fit text-white py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500 w-fit text-white py-1 px-3 rounded-md mt-2">
                {success}
              </div>
            )}
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your name"
            />
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
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Confirm your password"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              Sign Up
            </button>
          </form>
          <hr className="border-gray-600 my-6" />
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
