import { FcGoogle } from "react-icons/fc";
import Button from "@/components/ui/button";

export default function SignInWithButton() {
  return (
    <Button type="button" className="">
      <FcGoogle size={25} className="mr-2" />
      <span>{""}Sign In With Google</span>
    </Button>
  );
}
