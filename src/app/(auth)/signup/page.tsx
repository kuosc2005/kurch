"use client";
import { useState } from "react";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/button";
import HeaderText from "@/components/ui/HeaderText";
import InputField from "@/components/ui/InputField";
import TextLinkToggle from "@/components/ui/TextLinkToggle";
import SignInWithButton from "@/components/ui/SignInWithButton";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    console.log("Submit handle Test");
  };
  return (
    <>
      <HeaderText
        title="Join Our Community"
        subtitle="be a part of this community with KU student mail"
      />
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="John Doe"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />

        <InputField
          type="email"
          placeholder="johndoe@student.ku.edu.np"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <InputField
          type="password"
          value={formData.password}
          placeholder="********"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          required
        />

        <Button type="submit">Register</Button>
        <Divider>or</Divider>
        <SignInWithButton />
        <TextLinkToggle
          prompt="Already Have An Account?"
          linkText=" Sign In Here"
          to="/login"
        />
      </form>
    </>
  );
}
