"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#025C62] via-[#025C62] to-[#577B7B] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container px-4 sm:px-6 lg:px-8 xl:px-25 mx-auto max-w-7xl relative">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Main Content */}
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Join the Research
              <span className="block text-white/90">Community</span>
            </h2>
            <p className="max-w-3xl text-white/80 text-lg md:text-xl leading-relaxed mx-auto">
              Become part of Kathmandu University's vibrant research ecosystem
              and contribute to knowledge advancement.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/login" className="group">
              <button className="inline-flex items-center px-8 py-4 bg-white text-[#025C62] font-semibold rounded-xl hover:bg-white/95 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
