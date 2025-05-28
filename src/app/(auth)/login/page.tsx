"use client";

import { useState } from "react";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/button";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import TextLinkToggle from "@/components/ui/TextLinkToggle";
import SignInWithButton from "@/components/ui/SignInWithButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log("Submit handle Test");
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
