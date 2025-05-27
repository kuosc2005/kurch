import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/button";

export default function SignInWithButton() {
  return (
    <Button
      type="button"
      className="w-[90%] bg-white border py-2 px-2 rounded-[2px] focus:outline-none font-medium transition-colors flex items-center justify-center"
    >
      <FcGoogle size={25} className="mr-2" />
      <span>{""}Sign In With Google</span>
    </Button>
  );
}
