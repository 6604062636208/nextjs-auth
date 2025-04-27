"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <Navbar session={session} />
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <h3>Welcome to home page</h3>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          accusantium explicabo possimus, laudantium ipsa quod consequuntur cum?
          Similique tenetur explicabo ea esse suscipit voluptas beatae, quo
          dolor, veniam officiis distinctio!
        </p>
      </div>
    </main>
  );
}
