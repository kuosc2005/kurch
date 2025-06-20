import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return <div className="p-8 space-y-4 sm:space-y-6">{children}</div>;
};

export default MainContent;
