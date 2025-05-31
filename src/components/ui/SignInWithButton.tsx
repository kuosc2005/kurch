import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/button";

interface SignInWithButtonProps {
  provider: "google";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SignInWithButton({
  provider,
  onClick,
  disabled,
  className = "",
}: SignInWithButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-white border py-2 px-2 rounded-[2px] focus:outline-none font-medium transition-colors flex items-center justify-center ${className}`}
    >
      {provider === "google" && <FcGoogle size={25} className="mr-2" />}
      <span>Sign In With Google</span>
    </Button>
  );
}
