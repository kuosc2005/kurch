import React, { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  variant?: "default" | "small" | "outlined";
}

export default function Button({
  type = "button",
  onClick,
  className = "",
  children,
  variant = "default",
}: ButtonProps) {
  // Base styles shared by all variants
  const baseClasses =
    "flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 rounded-[2px]";

  // Variants
  const variantClasses: Record<string, string> = {
    default:
      "w-full bg-[#025C62] text-white py-2 px-2 hover:bg-teal-700 focus:ring-teal-500",
    small:
      "bg-[#025C62] text-white text-sm py-1.5 px-3 hover:bg-teal-700 focus:ring-teal-500",
    outlined:
      "border border-[#025C62] text-[#025C62] bg-transparent hover:bg-[#025C62] hover:text-white focus:ring-[#025C62]",
  };

  const combinedClassName =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
