import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function Button({
  type = "button",
  onClick,
  className = "",
  children,

  disabled = false,
}: ButtonProps) {
  // Base styles shared by all variants
  const baseClasses =
    " w-full bg-[#025C62]  py-2 px-2  focus:ring-teal-500 flex items-center justify-center font-medium cursor-pointer transition-colors focus:outline-none focus:ring-2 rounded-[2px]";

  const combinedClassName = `${baseClasses} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
