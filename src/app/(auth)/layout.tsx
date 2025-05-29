import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-[#025c6221] bg-[radial-gradient(circle,_#716f7410_3px,_transparent_3px)] [background-size:32px_32px] overflow-hidden">
      <div className="w-full h-full ">
        <Link href="/">
          <div className="w-full h-20 mx-auto  px-8 lg:mx-16 flex items-center gap-[15px] overflow-hidden border border-gray-200 justify-center lg:justify-start tracking-tight">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              objectFit="contain"
              alt="KURCH Logo"
            />
            <span className="text-xl font-bold">KURCH</span>
          </div>
        </Link>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col justify-center items-center w-full  z-20">
            <div className="max-w-[375px]">
              <div>{children}</div>
            </div>
          </div>

          <div className="relative w-full h-screen hidden lg:block z-10">
            {/* Background circles */}
            <div className="absolute inset-0">
              {/* Larger outer circle */}
              <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2  md:w-[750px] md:h-[750px]  2xl:w-[1000px] 2xl:h-[1000px] border border-gray-400 rounded-full opacity-30"></div>
              {/* Smaller inner circle */}
              <div className="absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2  md:w-[600px] md:h-[600px] 2xl:w-[850px] 2xl:h-[850px] border border-gray-400 rounded-full opacity-40"></div>
            </div>
            {/* Dashboard image */}
            <div className="relative z-10 flex items-center justify-end lg:left-[48] 2xl:left-[20] h-full">
              <Image
                width={768}
                height={576}
                style={{
                  boxShadow: "-2px 4px 17.1px 6px rgba(0, 0, 0, 0.13)",
                }}
                src="/auth_image.png"
                alt="Authentication illustration"
                className="max-w-full  2xl:max-h-[669px] radius-sm2 lg:max-h-[432px]  object-top-right object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
