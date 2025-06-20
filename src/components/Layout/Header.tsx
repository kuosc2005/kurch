import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden">
          <Link
            href="/"
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
            aria-label="KURCH"
          >
            <span className="text-blue-600 font-bold">KURCH</span>
          </Link>
        </div>

        <div className="w-full flex items-center justify-end ms-auto  gap-x-1 md:gap-x-3">
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
                <img
                  className="shrink-0 size-9.5 rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                  alt="User Avatar"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
