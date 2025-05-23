"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#025C62] via-[#025C62] to-[#577B7B] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container px-4 sm:px-6 lg:px-8  mx-auto  relative">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="KURCH Logo"
                  width={50}
                  height={50}
                  className="bg-white rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold text-white">KURCH</h3>
                  <p className="text-white/70 text-sm">
                    KU Research & Collaboration Hub
                  </p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed max-w-md">
                Kathmandu University Research and Collaboration Hub - Connecting
                minds, fostering innovation, and advancing knowledge through
                collaboration.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { href: "#about", label: "About" },
                  { href: "#features", label: "Features" },
                  { href: "#contact", label: "Contact" },
                  { href: "/login", label: "Login" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Kathmandu University. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
