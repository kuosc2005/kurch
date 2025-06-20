"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, BookOpen, MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";

interface NavigationItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  href,
  label,
  icon: Icon,
  isActive = false,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg transition-colors ${
          isActive
            ? "bg-primary/10 text-primary border-l-1 border-primary"
            : "text-gray-700 hover:bg-primary/10 hover:text-primary"
        } focus:outline-none focus:bg-primary/10 focus:text-primary`}
      >
        <Icon className="shrink-0 size-4" />
        {label}
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const user = useSession();

  const NAVIGATION_ITEMS = [
    {
      href: "/projects",
      label: "Projects",
      icon: Home,
    },
    {
      href: "/research",
      label: "Research Papers",
      icon: BookOpen,
    },
    {
      href: "/conversations",
      label: "Conversations",
      icon: MessageSquare,
    },
    {
      href: `/profile/${user.data?.user.id}`,
      label: "Profile",
      icon: Users,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("hs-sidebar");
      const overlay = document.getElementById("sidebar-overlay");
      const target = event.target as HTMLElement;

      if (
        sidebar &&
        !sidebar.contains(target) &&
        !target.closest('button[aria-label="Toggle navigation"]')
      ) {
        if (!sidebar.classList.contains("-translate-x-full")) {
          sidebar.classList.add("-translate-x-full");
          sidebar.classList.remove("translate-x-0");
          if (overlay) {
            overlay.classList.add("hidden");
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeSidebar = () => {
    const sidebar = document.getElementById("hs-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) {
      sidebar.classList.add("-translate-x-full");
      sidebar.classList.remove("translate-x-0");
    }
    if (overlay) {
      overlay.classList.add("hidden");
    }
  };

  return (
    <>
      {/* Background Overlay for Mobile */}
      <div
        id="sidebar-overlay"
        className="fixed inset-0 bg-black/50 z-40 lg:hidden hidden"
        onClick={closeSidebar}
      />

      <div
        id="hs-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 lg:z-30 lg:top-[57px]"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Navigation Content */}
          <div className="h-full pt-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav className="p-3 w-full flex flex-col flex-wrap">
              <ul className="flex flex-col space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <NavigationItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isActive={pathname === item.href}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
