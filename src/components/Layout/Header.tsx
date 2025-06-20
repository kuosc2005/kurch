import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavigation from "./MobileNavigation";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full  bg-white border-b border-gray-200 text-sm py-2.5">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <MobileNavigation />

        {/* Desktop Logo */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-xl text-xl font-semibold focus:outline-hidden focus:opacity-80"
            aria-label="KURCH"
          >
            <Image width={24} height={24} src="/logo.png" alt="KURCH Logo" />
            <span className="text-primary font-bold text-xl">KURCH</span>
          </Link>
        </div>

        <div className="w-full flex items-center justify-end ms-auto gap-x-1 md:gap-x-3">
          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-end gap-1">
            <button
              type="button"
              className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
            >
              <Bell className="shrink-0 size-4" />
              <span className="sr-only">Notifications</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative inline-flex">
              <button
                type="button"
                className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden"
              >
                <span>JD</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
