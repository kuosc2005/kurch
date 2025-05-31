// app/layout.tsx
import type { Metadata } from "next";
import AcademicLayout from "@/components/Navigation";

export const metadata: Metadata = {
  title: "KURCH - Academic Research Platform",
  description: "Academic research and collaboration platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AcademicLayout>{children}</AcademicLayout>;
}
