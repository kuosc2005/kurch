"use client";

import { useState } from "react";
import { ProfileData } from "../../types/profile";
import { AboutSection } from "./AboutSection";
import { PublicationsSection } from "@/components/profile/PublicationsSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { TabNavigation, TabType } from "./TabNavigation";

interface ProfileContentProps {
  profileData: ProfileData;
}

export function ProfileContent({ profileData }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Publications");

  const tabs = ["About", "Publications", "Projects"] as const;

  return (
    <>
      {/* Mobile Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        variant="mobile"
      />

      {/* Desktop Layout */}
      <div className="hidden xl:grid xl:grid-cols-3 gap-6">
        {/* Left Sidebar - About */}
        <div className="xl:col-span-1">
          <AboutSection
            university={profileData.university}
            location={profileData.location}
            education={profileData.education}
            email={profileData.email}
            researchInterests={profileData.researchInterests}
            bio={profileData.bio}
          />
        </div>

        {/* Right Content - Publications/Projects */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={["Publications", "Projects"]}
            variant="desktop"
          />

          {activeTab === "Publications" && (
            <PublicationsSection publications={profileData.publications} />
          )}
          {activeTab === "Projects" && <ProjectsSection />}
        </div>
      </div>

      {/* Mobile Content */}
      <div className="xl:hidden">
        {activeTab === "About" && (
          <AboutSection
            university={profileData.university}
            location={profileData.location}
            education={profileData.education}
            email={profileData.email}
            researchInterests={profileData.researchInterests}
            bio={profileData.bio}
          />
        )}
        {activeTab === "Publications" && (
          <PublicationsSection publications={profileData.publications} />
        )}
        {activeTab === "Projects" && <ProjectsSection />}
      </div>
    </>
  );
}
