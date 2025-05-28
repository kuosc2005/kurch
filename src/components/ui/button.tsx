import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  type = "button",
  onClick,
  className = "w-[90%] bg-[#025C62] text-white py-2 px-2 rounded-[2px] hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium transition-colors flex items-center justify-center",
  children,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
