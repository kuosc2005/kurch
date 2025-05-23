"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="container px-4 sm:px-6 lg:px-8 xl:px-25 mx-auto  relative">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16 md:mb-20">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-slate-900">Contact</span>
              <span className="text-[#025C62] ml-3">Us</span>
            </h2>
            <p className="max-w-3xl text-slate-600 text-lg md:text-xl leading-relaxed mx-auto">
              Have questions or need assistance? Reach out to the KURCH team.
            </p>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Email
              </h3>
              <p className="text-slate-600 leading-relaxed">kucc@ku.edu.np</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Phone
              </h3>
              <p className="text-slate-600 leading-relaxed">+977-01-1234567</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="group relative bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#025C62]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#025C62] to-[#577B7B] shadow-lg mb-6">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#025C62] transition-colors">
                Address
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Kathmandu University, Dhulikhel, Kavre, Nepal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
