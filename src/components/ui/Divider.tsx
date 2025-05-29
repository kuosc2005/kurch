import React from "react";

export default function Divider({ children }: React.PropsWithChildren) {
  return (
    <div className="relative flex items-center ">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">{children}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
