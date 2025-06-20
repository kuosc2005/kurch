import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="w-full lg:ps-64 pt-[57px] lg:pt-0">
      <div className="p-8  space-y-4 sm:space-y-6">{children}</div>
    </div>
  );
};

export default MainContent;
