"use client";
import { useState, FormEvent, ChangeEvent, JSX } from "react";
import { toast } from "sonner";
import Divider from "@/components/ui/Divider";

import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import TextLinkToggle from "@/components/ui/TextLinkToggle";
import SignInWithButton from "@/components/ui/SignInWithButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// Types
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: number;
}

interface SubmissionData {
  username: string;
  email: string;
  password: string;
}

// Valid email domains configuration
const VALID_DOMAINS: readonly string[] = [
  "@student.ku.edu.np",
  "@ku.edu.np",
  // Add more domains here later as needed
] as const;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/projects",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to initiate Google sign-in. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  // Password strength validation
  const validatePasswordStrength = (password: string): PasswordValidation => {
    const minLength: number = 8;
    const hasUpperCase: boolean = /[A-Z]/.test(password);
    const hasLowerCase: boolean = /[a-z]/.test(password);
    const hasNumbers: boolean = /\d/.test(password);
    const hasSpecialChar: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors: string[] = [];

    if (password.length < minLength) {
      errors.push(`At least ${minLength} characters`);
    }
    if (!hasUpperCase) {
      errors.push("One uppercase letter");
    }
    if (!hasLowerCase) {
      errors.push("One lowercase letter");
    }
    if (!hasNumbers) {
      errors.push("One number");
    }
    if (!hasSpecialChar) {
      errors.push("One special character");
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength: password.length === 0 ? 0 : Math.max(1, 5 - errors.length),
    };
  };

  // Email domain validation
  const validateEmailDomain = (email: string): boolean => {
    if (!email) return false;
    return VALID_DOMAINS.some((domain: string) =>
      email.toLowerCase().endsWith(domain.toLowerCase()),
    );
  };

  // Form validation for submission
  const validateForm = (): boolean => {
    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      toast.error("Username is required");
      isValid = false;
    } else if (formData.username.trim().length < 2) {
      toast.error("Username must be at least 2 characters");
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      toast.error("Email is required");
      isValid = false;
    } else if (!validateEmailDomain(formData.email)) {
      toast.error(
        `Email must be from one of these domains: ${VALID_DOMAINS.join(", ")}`,
      );
      isValid = false;
    }

    // Password validation
    const passwordValidation: PasswordValidation = validatePasswordStrength(
      formData.password,
    );
    if (!formData.password) {
      toast.error("Password is required");
      isValid = false;
    } else if (!passwordValidation.isValid) {
      toast.error(
        `Password must have: ${passwordValidation.errors.join(", ")}`,
      );
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      toast.error("Please confirm your password");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        username: formData.username.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      };

      console.log("Form submission data:", submissionData);

      const response = await axios.post("api/auth/signUp", submissionData);
      console.log("API response:", response);

      if (response.status === 500) {
        const errorData = await response.data;
        throw new Error(errorData.message || "Registration failed");
      }

      toast.success(response.data.message || "Registration successful!");
      router.push(
        `/signup/verify?email=${encodeURIComponent(submissionData.email)}`,
      );
    } catch (error: any) {
      console.error("Registration error:", error);

      const errorMessage = error
        ? error.response.data.message
        : "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time validation on input change (only for password matching)
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));

    // No real-time validation for username or email - only on submit
    // Only track password matching in real-time for UX
  };

  const passwordStrength: PasswordValidation = validatePasswordStrength(
    formData.password,
  );
  const passwordsMatch: boolean =
    !!formData.password &&
    !!formData.confirmPassword &&
    formData.password === formData.confirmPassword;
  const passwordsDontMatch: boolean =
    !!formData.password &&
    !!formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  const getStrengthColor = (level: number): string => {
    if (level <= passwordStrength.strength) {
      if (passwordStrength.strength <= 2) return "bg-red-500";
      if (passwordStrength.strength <= 4) return "bg-yellow-500";
      return "bg-green-500";
    }
    return "bg-gray-200";
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 2) return "Weak";
    if (strength <= 4) return "Medium";
    return "Strong";
  };

  return (
    <>
      <HeaderText
        title="Join Our Community"
        subtitle="be a part of this community with KU student mail"
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <InputField
            type="text"
            placeholder="John Doe"
            value={formData.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("username", e.target.value)
            }
            required
          />
        </div>

        <div>
          <InputField
            type="email"
            placeholder="johndoe@student.ku.edu.np"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
            required
          />
        </div>

        <div>
          <InputField
            type="password"
            value={formData.password}
            placeholder="********"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("password", e.target.value)
            }
            required
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((level: number) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${getStrengthColor(level)}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600">
                Password strength: {getStrengthText(passwordStrength.strength)}
              </p>
            </div>
          )}
        </div>

        <div>
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            required
          />
          {/* Real-time password match indicator */}
          {formData.confirmPassword && (
            <div className="mt-1">
              {passwordsMatch && (
                <p className="text-green-600 text-xs">✓ Passwords match</p>
              )}
              {passwordsDontMatch && (
                <p className="text-red-500 text-xs">✗ Passwords do not match</p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#025C62] text-white py-2 px-2 rounded-[2px] hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium transition-colors flex items-center justify-center"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {/*  <Divider>or</Divider> */}
        {/* <SignInWithButton */}
        {/*   provider="google" */}
        {/*   onClick={handleGoogleSignIn} */}
        {/*   disabled={isGoogleLoading} */}
        {/*   className="w-full" */}
        {/* /> */}
        <TextLinkToggle
          prompt="Already Have An Account?"
          linkText=" Sign In Here"
          to="/login"
        />
      </form>
    </>
  );
}
