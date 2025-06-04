import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.css";
import CustomSessionProvider from "@/components/SessionLayout/CustomSessionProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kathmandu University Research and Collaboaration Hub",
  description:
    "Connecting researchers, fostering innovation, and advancing knowledge through collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}antialiased `}>
        <CustomSessionProvider>
          {/* SessionProvider is used to manage user sessions */}
          {children}
        </CustomSessionProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
