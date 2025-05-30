// components/AcademicLayout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, User, Settings, Menu } from "lucide-react";

interface AcademicLayoutProps {
  children: React.ReactNode;
}

const AcademicLayout: React.FC<AcademicLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "My Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
              <Link href="/" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                  KURCH
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                      isActive(item.href) ? "bg-gray-100" : ""
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

      {/* Main content */}
      <div className=" p-12 lg:ml-64 ">
        <div className=" mt-16">{children}</div>
      </div>
    </div>
  );
};

export default AcademicLayout;
