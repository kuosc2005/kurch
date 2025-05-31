"use client";

export type TabType = "About" | "Publications" | "Projects";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs: readonly TabType[];
  variant?: "mobile" | "desktop";
}

export function TabNavigation({
  activeTab,
  onTabChange,
  tabs,
  variant = "desktop",
}: TabNavigationProps) {
  if (variant === "mobile") {
    return (
      <div className="xl:hidden">
        <div className="flex space-x-1 bg-gray-100 p-1 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 py-2 px-3 text-sm font-medium  transition-colors ${
                activeTab === tab
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`pb-3 px-1 text-sm font-medium transition-colors ${
            activeTab === tab
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
