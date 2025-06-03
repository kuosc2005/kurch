"use client";
import { Button } from "@/components/ui/RadixButton";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
export default function Hero() {
  return (
    <div>
      <Header />
      <section className="relative  pt-24 h-[55rem] flex flex-col justify-center items-center bg-gradient-to-t from-[#025C62]/5 via-[#025C62]/10 to-[#025C62]/60 overflow-hidden">
        {" "}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none z-0" />
        <div className="container  relative px-4 sm:px-6 lg:px-8  mx-auto ">
          <div className="grid gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
            {/* Content Section */}

            <div className="flex flex-col justify-center space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Main Heading */}
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                  <span className="text-gray-800 block">
                    Kathmandu University
                  </span>
                  <span className="text-[#025C62] font-semibold block mt-2">
                    Research and Collaboration Hub
                  </span>
                </h1>
                <p className="max-w-[600px] mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed">
                  Connecting researchers, fostering innovation, and advancing
                  knowledge through collaboration.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-[#025C62] cursor-pointer hover:bg-[#025C62]/20 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group px-6 py-3 sm:px-8 sm:py-4"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#about" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-[#025C62] text-[#025C62] hover:text-[#025C62]/80 cursor-pointer font-semibold transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Section */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                {/* Decorative Elements - Responsive sizes */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#577B7B]/5 rounded-full blur-2xl sm:blur-3xl" />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-slate-200/30 rounded-full blur-2xl sm:blur-3xl" />

                {/* Main Logo Container - Responsive sizing */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="KURCH - Academic Research Platform"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 420px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
