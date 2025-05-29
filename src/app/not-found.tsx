import HeaderText from "@/components/ui/HeaderText";
import React from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <HeaderText
        title="404! Page Not Found"
        subtitle="Looks like you've taken a wrong turn"
      />
    </div>
  );
}
