"use client";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export default function Page() {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get email from URL search params
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");

      if (!email) {
        toast.error("Email not found. Please try signing up again.");
        router.push("/signup");
        return;
      }

      const response = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        router.push("/projects");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
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
          placeholder="Enter OTP"
          value={otp}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="border-0 rounded-none"
        />
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-teal-700 hover:bg-teal-800  px-4 py-3 text-white flex items-center justify-center border-black border-l"
          aria-label="Submit"
        >
          {isSubmitting ? "Verifying..." : <FaArrowRight size={20} />}
        </Button>
      </div>
    </>
  );
}
