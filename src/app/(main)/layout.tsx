import type { Metadata } from "next";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import MainContent from "@/components/Layout/MainContent";

export const metadata: Metadata = {
  title: "KURCH - Academic Research Platform",
  description: "Academic research and collaboration platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overscroll-none bg-gray-50 ">
      <Header />
      <Sidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
}
