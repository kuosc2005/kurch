import React from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}: InputProps) {
  const baseStyles =
    "w-[90%] px-2 py-2 border border-black bg-white rounded-[2px] text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${baseStyles} ${className} `}
    />
  );
}
