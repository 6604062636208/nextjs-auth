"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function WelcomePage() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) redirect("/login");
  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <h3 className="text-3xl my-3">Welcome {session?.user?.name}</h3>
        <p>Email: {session?.user?.email}</p>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          repellat voluptatum culpa quae beatae iste voluptate eum aliquam
          alias, deserunt aspernatur possimus? Perspiciatis fugiat expedita,
          modi facere doloremque accusantium illo.
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
