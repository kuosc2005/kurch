"use client";
import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

const MobileNavigation: React.FC = () => {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("hs-sidebar");
    if (sidebar) {
      sidebar.classList.toggle("-translate-x-full");
      sidebar.classList.toggle("translate-x-0");
    }
  };

  return (
    <div className="flex items-center lg:hidden">
      <button
        type="button"
        onClick={toggleSidebar}
        className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 mr-3"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <Menu className="shrink-0 size-4" />
      </button>

      <Link
        href="/"
        className="flex items-center space-x-2 rounded-xl text-xl font-semibold focus:outline-hidden focus:opacity-80"
        aria-label="KURCH"
      >
        <Image width={24} height={24} src="/logo.png" alt="KURCH Logo" />
        <span className="text-primary font-bold text-xl">KURCH</span>
      </Link>
    </div>
  );
};

export default MobileNavigation;
