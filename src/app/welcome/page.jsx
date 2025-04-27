"use client";

import React from "react";
import Navbar from "../components/Navbar";

function WelcomePage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-4 py-4">
        <h3 className="text-3xl my-3">Welcome User</h3>
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
