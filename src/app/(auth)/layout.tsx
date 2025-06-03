import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-[#025c6221] bg-[radial-gradient(circle,_#716f7410_3px,_transparent_3px)] [background-size:32px_32px] overflow-hidden">
      <div className="xl:mx-8 lg:mx-6 md:mx-4 sm:mx-2 w-full h-full">
        <Link href="/">
          <div className="w-full h-20 mx-auto xl:mx-12 lg:mx-8 md:mx-6 sm:mx-4 flex items-center gap-4 px-4  justify-center lg:justify-start tracking-tight ">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              objectFit="contain"
              alt="KURCH Logo"
            />
            <span className="text-xl font-bold text-gray-800">KURCH</span>
          </div>
        </Link>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col lg:items-start items-center w-full z-20 px-4 xl:mx-6 lg:mx-4 md:mx-2 sm:mx-1">
            <div className="sm:w-full md:w-full lg:w-[80%]">
              <div className=" p-6 rounded-lg ">{children}</div>
            </div>
          </div>

          <div className="relative w-full h-screen hidden lg:flex z-10">
            <div className="relative z-10 flex items-center justify-end">
              <div className="relative items-center 2xl:w-[1052px] 2xl:h-[590px] xl:w-[876px] xl:h-[492px] lg:w-[613px] lg:h-[344px] md:lg:left-[120px] 2xl:left-[150px]">
                <Image
                  src="/auth_image.png"
                  alt="Authentication illustration"
                  fill
                  style={{
                    boxShadow: "-2px 4px 17.1px 6px rgba(0, 0, 0, 0.13)",
                  }}
                  className="object-right-top rounded-md"
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
