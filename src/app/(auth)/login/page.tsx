"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/button";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import TextLinkToggle from "@/components/ui/TextLinkToggle";
import SignInWithButton from "@/components/ui/SignInWithButton";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const VALID_DOMAINS: readonly string[] = [
  "@student.ku.edu.np",
  "@ku.edu.np",
] as const;

const Login = () => {
  return (
    <>
      <Suspense>
        <LoginPage />
      </Suspense>
    </>
  );
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL error parameters (from failed Google sign-in)
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "ACCOUNT_EXISTS_WITH_PASSWORD":
          toast.error(
            "An account with this email already exists. Please sign in with your email and password instead."
          );
          break;
        case "USER_CREATION_FAILED":
          toast.error("Failed to create your account. Please try again.");
          break;
        case "GOOGLE_SIGNIN_ERROR":
          toast.error("Google sign-in failed. Please try again.");
          break;
        case "GOOGLE_SIGNIN_FAILED":
          toast.error(
            "Unable to sign in with Google. Please try again or use email/password."
          );
          break;
        default:
          toast.error("Sign-in failed. Please try again.");
      }
      // Clear the error from URL
      router.replace("/login");
    }
  }, [searchParams, router]);

  const validateEmailDomain = (email: string): boolean => {
    if (!email) return false;
    return VALID_DOMAINS.some((domain: string) =>
      email.toLowerCase().endsWith(domain.toLowerCase())
    );
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
      }

      if (!validateEmailDomain(email)) {
        toast.error("Please use a valid KU email address.");
        return;
      }

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Response from signIn:", response);

      if (response?.error) {
        switch (response.error) {
          case "USER_NOT_FOUND":
            toast.error(
              "No account found with this email address. Please check your email or sign up."
            );
            break;
          case "INVALID_PASSWORD":
            toast.error("Incorrect password. Please try again.");
            break;
          case "USE_GOOGLE_SIGNIN":
            toast.error(
              "This account was created with Google. Please use 'Sign in with Google' instead."
            );
            break;
          case "PASSWORD_RESET_REQUIRED":
            toast.error(
              "Account setup incomplete. Please reset your password or contact support."
            );
            break;
          case "EMAIL_PASSWORD_REQUIRED":
            toast.error("Please enter both email and password.");
            break;
          case "DATABASE_ERROR":
            toast.error(
              "Unable to connect to our servers. Please try again later."
            );
            break;
          case "CredentialsSignin":
          case "AUTHENTICATION_FAILED":
          default:
            toast.error(
              "Login failed. Please check your credentials and try again."
            );
            break;
        }
        console.error("Login error:", response.error);
      } else if (response?.ok) {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to initiate Google sign-in. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <HeaderText title="Sign In" subtitle="Welcome back to your account" />

      <form onSubmit={handleCredentialsSubmit} className="space-y-4">
        <InputField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@ku.edu.np"
          required
          disabled={isLoading}
        />

        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <Button type="submit" disabled={isLoading} className="text-white">
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <Divider> or </Divider>

      <SignInWithButton
        provider="google"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        className="w-full"
      />

      <div className="mt-6 text-center">
        <TextLinkToggle
          prompt="Don't have an account? "
          linkText="Sign up"
          to="/signup"
        />
      </div>
    </div>
  );
};

export default Login;
