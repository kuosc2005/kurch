"use client";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

export default function page() {
  const [value, setValue] = useState("123456");

  const handleSubmit = () => {
    console.log("Submitted value:", value);
    // Handle submission logic here
  };

  return (
    <>
      <HeaderText
        title="Verify Email"
        subtitle="Enter the 6-digit code sent to your email"
      />
      <div className="flex border border-black rounded-[2px] overflow-hidden bg-white">
        <InputField
          type="text"
          placeholder="123456"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="border-0 rounded-none"
        />
        <Button
          onClick={handleSubmit}
          className="bg-teal-700 hover:bg-teal-800 px-4 py-3 text-white flex items-center justify-center border-black border-l"
          aria-label="Submit"
        >
          <FaArrowRight size={20} />
        </Button>
      </div>
    </>
  );
}
