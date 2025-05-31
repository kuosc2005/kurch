import React, { KeyboardEvent } from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  variant?: "base" | "alt"; // new variant prop
}

export default function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  onKeyPress,
  variant = "base", // default to base
}: InputProps) {
  const baseStyles =
    "w-full px-2 py-2 border border-gray-300 bg-white rounded-[3px] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";

  const altStyles =
    "w-full px-3 py-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none";

  const finalStyles = variant === "alt" ? altStyles : baseStyles;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${finalStyles} ${className}`}
      onKeyPress={onKeyPress}
    />
  );
}
