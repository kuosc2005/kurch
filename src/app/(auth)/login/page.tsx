"use client";

import { useState } from "react";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/button";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import TextLinkToggle from "@/components/ui/TextLinkToggle";
import SignInWithButton from "@/components/ui/SignInWithButton";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      // Simple form validation
      if (!email || !password) {
        toast.error("Please enter both email and password.");
        return;
      }
      // valid mails
      if (!email.endsWith("@student.ku.edu.np") || !email.endsWith("@ku.edu.np")) {
        toast.error("Please use your KU student email.");
        return;
      }
      
      const response= signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent automatic redirection
      });
   
      console.log("Response from signIn:", response);

      // response k aauxa tyo anusar handling garnu parxa

    } catch (error:any) {
      toast.error(error.response.data.message||"An error occurred while logging in. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <HeaderText
        title="Welcome Back"
        subtitle="be a part of this community with KU student mail"
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          type="email"
          placeholder="johndoe@student.ku.edu.np"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <TextLinkToggle
          linkText="Forgot Password?"
          to="/"
          className="text-right"
        />
        <Button type="submit">Login</Button>
        <Divider>or</Divider>
        <SignInWithButton />
        <TextLinkToggle
          prompt="Don't Have An Account?"
          linkText=" Sign Up Here"
          to="/signup"
        />
      </form>
    </>
  );
};

export default LoginPage;
