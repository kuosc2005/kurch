"use client";

import { ArrowRight, BookOpen, Users, FileText } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#025C62]/5">
      <div className="container px-4 sm:px-6 lg:px-8  mx-auto ">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16 md:mb-20">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-slate-900">About</span>
              <span className="text-[#025C62] ml-3">KURCH</span>
            </h2>
            <p className="max-w-4xl text-slate-600 text-lg md:text-xl leading-relaxed mx-auto">
              The Kathmandu University Research and Collaboration Hub (KURCH) is
              a platform designed to facilitate research, innovation, and
              collaboration among students, faculty, and research labs.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Research Repository Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Research Repository
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Access a comprehensive collection of research papers, theses,
                and publications from Kathmandu University.
              </p>
              <div className="flex items-center text-[#025C62] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Explore Repository
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>

          {/* Collaboration Network Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Collaboration Network
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Connect with researchers, faculty members, and industry partners
                for collaborative projects and initiatives.
              </p>
              <div className="flex items-center text-[#025C62] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Join Network
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>

          {/* Resource Sharing Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Resource Sharing
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Share and access research resources, datasets, methodologies,
                and tools to enhance research quality.
              </p>
              <div className="flex items-center text-[#025C62] font-medium text-sm group-hover:translate-x-1 transition-transform">
                Access Resources
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
