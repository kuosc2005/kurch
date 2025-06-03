"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/RadixButton";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function AcademicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const tabs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "Team", href: "/team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl  shadow-md" : "bg-transparent"
        }`}
      style={{ willChange: "backdrop-filter, background" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="relative flex items-center justify-between h-20">
          {/* Brand Identity */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Image
                src="/logo-bg.svg"
                alt="KURCH Academic Platform"
                width={50}
                height={50}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                KURCH
              </span>
            </div>
          </div>

          {/* Primary Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                className="relative px-4 py-2 text-md  font-medium text-slate-800 hover:text-[#025C62] transition-all duration-300 rounded-lg  group"
              >
                {tab.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#025C62] to-[#577B7B] transition-all duration-300 group-hover:w-8 group-hover:left-1/2 transform -translate-x-1/2"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:text-[#025C62] bg-slate-200 hover:bg-slate-50 font-medium border border-slate-200 hover:border-[#025C62]/30 transition-all duration-300"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#025C62] to-[#577B7B] hover:from-[#025C62]/90 hover:to-[#577B7B]/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#025C62] hover:bg-slate-50 transition-all duration-300"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-4 py-6 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-6">
              {tabs.map((tab, index) => (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#025C62] hover:bg-white rounded-xl transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>

            {/* Mobile User Actions */}
            <div className="space-y-3">
              <Link href="/login" className="block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-slate-700 hover:text-[#025C62] hover:bg-white font-medium border border-slate-200 hover:border-[#025C62]/30 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="block">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#025C62] to-[#577B7B] hover:from-[#025C62]/90 hover:to-[#577B7B]/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
