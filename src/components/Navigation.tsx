"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  User,
  Settings,
  Menu,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface AcademicLayoutProps {
  children: React.ReactNode;
}

const AcademicLayout: React.FC<AcademicLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const sessionData = useSession();

  const navigation = [
    { name: "Projects", href: "/projects", icon: BarChart3 },
    {
      name: "Profile",
      href: `/profile/${sessionData.data?.user.id}`,
      icon: User,
    },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="flex  items-center justify-between bg-[#f9Fafb] h-18 border-b border-gray-200 fixed w-full z-50 top-0">
        <div className="w-full px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
              <Link href="/" className="flex ml-2 md:mr-24 gap-x-3">
                <span>
                  <span>
                    <Image
                      width={40}
                      height={40}
                      src="/logo.png"
                      alt="KURCH - Academic Research Platform"
                      className="object-contain"
                      priority
                    />
                  </span>
                </span>
                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-900">
                  KURCH
                </span>
              </Link>
            </div>
            {/* User Box */}
            <div className="flex items-center relative">
              <div className="flex items-center ml-3">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-sm bg-gray-00 rounded-full"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 py-4 overflow-y-auto ">
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-teal-400/15 group ${
                      isActive(item.href) ? "bg-teal-400/15" : ""
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dropdown backdrop */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Main content */}
      <div className=" p-12 lg:ml-64 ">
        <div className=" mt-16">{children}</div>
      </div>
    </div>
  );
};

export default AcademicLayout;
