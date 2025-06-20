import React from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Settings,
  FolderOpen,
  Calendar,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

const Sidebar: React.FC = () => {
  return (
    <div className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full hidden fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0">
      <div className="relative flex flex-col h-full max-h-full">
        <div className="px-6 pt-4 flex items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-xl text-xl font-semibold focus:outline-hidden focus:opacity-80"
            aria-label="KURCH"
          >
            <Image width={32} height={32} src="/logo.png" alt="default" />
            <span className="text-primary font-bold text-2xl">KURCH</span>
          </Link>
        </div>

        {/* Navigation Content */}
        <div className="h-full pt-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <nav className="p-3 w-full flex flex-col flex-wrap">
            <ul className="flex flex-col space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <Home className="shrink-0 size-4" />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/research"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <BookOpen className="shrink-0 size-4" />
                  Research Papers
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <FolderOpen className="shrink-0 size-4" />
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/collaboration"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <Users className="shrink-0 size-4" />
                  Collaboration
                </Link>
              </li>

              <li>
                <Link
                  href="/calendar"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <Calendar className="shrink-0 size-4" />
                  Calendar
                </Link>
              </li>

              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <Settings className="shrink-0 size-4" />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
