import { HiUserCircle } from "react-icons/hi";

export default function ProfilePicture({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center  space-y-5 mr-8">
      <div>
        <HiUserCircle color="lightgray" size={120} />
      </div>
      <div className="flex lg:flex-row flex-col space-x-5 my-3 max-w-[100%]">
        {children}
      </div>
    </div>
  );
}
