"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bell, DoorOpenIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileNavigation from "./MobileNavigation";
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
  };
  const user = useSession();

  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full  bg-white border-b border-gray-200 text-sm py-2.5">
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
            <div
              className="relative bg-gray-200 rounded-full  inline-flex"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="size-9.5 cursor-pointer inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden"
              >
                <span>{user.data?.user.name?.charAt(0)}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center cursor-pointer text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                  >
                    <DoorOpenIcon />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
