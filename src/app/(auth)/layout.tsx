import React from "react";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#025C621F",
      }}
      className="absolute -z-20 inset-0 h-full w-full bg-[radial-gradient(circle,#716f7415_2px,transparent_2px)] bg-[size:24px_24px] overflow-hidden"
    >
      <div className="min-h-screen flex flex-col">
        <div className="w-full p-2 lg:p-2">
          <div className="flex justify-center lg:justify-start max-w-7xl mx-auto">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 mr-2 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src="/logo.png"
                  alt="KURCH Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-blue-900">KURCH</span>
            </Link>
          </div>
        </div>
        <div className="flex-grow flex flex-col lg:flex-row items-center justify-center ">
          <div className="w-full lg:w-1/2 p-4 md:p-5 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">{children}</div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center relative ">
            <div className="relative w-[600px] h-[600px] lg:w-[700px] lg:h-[700px] xl:w-[800px] xl:h-[800px] 2xl:w-[900px] 2xl:h-[900px] aspect-square">
              {/* Outer circle - 900px max */}
              <div className="absolute inset-0 rounded-full border-[#025c621f] border-2 border-solid z-[-10]" />
              {/* Inner circle - 750px max */}
              <div className="absolute top-[8.33%] left-[8.33%] w-[83.33%] h-[83.33%] rounded-full border-[#bbcfd0e6] border-2 border-solid z-20 aspect-square" />
              {/* Image container - on top */}
              <div
                style={{
                  boxShadow: "-2px 4px 17.1px 6px rgba(0, 0, 0, 0.13)",
                }}
                className="absolute top-[20%] right-[-15%] w-[100%] h-[60%] rounded-[5px] z-30 aspect-square overflow-hidden"
              >
                <Image
                  width={768}
                  height={576}
                  src="/auth_image.png"
                  alt="Authentication illustration"
                  className="object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
