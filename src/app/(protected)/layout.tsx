"use client";

import { useState, ReactNode } from "react";
import { IconType } from "react-icons";
import {
  HiMenu,
  HiX,
  HiHome,
  HiChartBar,
  HiUser,
  HiBookOpen,
  HiBriefcase,
  HiUsers,
  HiChatAlt,
  HiBell,
  HiCog,
} from "react-icons/hi";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarItem {
  icon: IconType;
  label: string;
  active?: boolean;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems: SidebarItem[] = [
    { icon: HiHome, label: "Feed", active: true },
    { icon: HiChartBar, label: "My Dashboard" },
    { icon: HiUser, label: "Profile" },
    { icon: HiBookOpen, label: "Publications" },
    { icon: HiBriefcase, label: "Projects" },
    { icon: HiUsers, label: "Network" },
    { icon: HiChatAlt, label: "Messages" },
    { icon: HiBell, label: "Notifications" },
    { icon: HiCog, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">KURCH</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <HiUser size={16} className="text-white" />
          </div>
          <span className="hidden sm:inline text-gray-700 text-sm">
            Desktop - 7
          </span>
        </div>
      </nav>

      <div className="flex pt-16">
        {" "}
        {/* Add top padding for fixed navbar */}
        {/* Fixed Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
          lg:top-16 top-16
        `}
        >
          <div className="h-full overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`
                    flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      item.active
                        ? "bg-teal-50 text-teal-700 border-r-3 border-teal-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content with proper spacing */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
