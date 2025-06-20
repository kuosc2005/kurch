import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="w-full lg:ps-64">
      <div className="py-6 px-8  sm:p-6 space-y-4 sm:space-y-6">{children}</div>
    </div>
  );
};

export default MainContent;
