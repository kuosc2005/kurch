"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#025C62]/10">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            <span className="text-slate-900">Contact</span>
            <span className="text-[#025C62] ml-2">Us</span>
          </h2>
          <p className="text-slate-600 mt-4">
            Have questions or need assistance? Reach out to the KURCH team.
          </p>
        </div>

        {/* Contact Info */}
        <div className="max-w-xl mx-auto grid gap-8">
          <div className="flex items-center gap-4 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <Mail className="h-7 w-7 text-white bg-gradient-to-br from-[#025C62] to-[#577B7B] rounded-lg p-1" />
            <div>
              <div className="font-semibold text-slate-900">Email</div>
              <div className="text-slate-600">kucc@ku.edu.np</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <Phone className="h-7 w-7 text-white bg-gradient-to-br from-[#025C62] to-[#577B7B] rounded-lg p-1" />
            <div>
              <div className="font-semibold text-slate-900">Phone</div>
              <div className="text-slate-600">+977-01-1234567</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <MapPin className="h-7 w-7 text-white bg-gradient-to-br from-[#025C62] to-[#577B7B] rounded-lg p-1" />
            <div>
              <div className="font-semibold text-slate-900">Address</div>
              <div className="text-slate-600">
                Kathmandu University, Dhulikhel, Kavre, Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
