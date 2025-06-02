"use client";

import { useEffect, useState } from "react";
import { ProfileData } from "../../types/profile";
import { AboutSection } from "./AboutSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { TabNavigation, TabType } from "./TabNavigation";
import { Button } from "../ui/RadixButton";
import { HiPlus } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProfileContentProps {
  profileData: ProfileData;
  isCurrentUser: boolean;
}

export function ProfileContent({
  profileData,
  isCurrentUser,
}: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Projects");
  const session = useSession();
  const tabs = ["About", "Projects"] as const;
  const [projects, setProjects] = useState<Project[]>([]);
  const [_, setIsLoading] = useState(true);

  useEffect(
    function () {
      const fetchProjects = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `/api/projects/user/${session.data?.user.id}`
          );

          if (!response.ok) {
            throw new Error("failed to fetch user's projects");
          }

          const data = await response.json();
          setProjects(data || []);
        } catch (error) {
          console.log(error);
          setProjects([]);
        } finally {
          setIsLoading(false);
        }
      };

      if (session.data?.user.id) {
        fetchProjects();
      }
    },
    [session.data?.user.id]
  );

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
            research_interests={profileData.research_interests}
            bio={profileData.bio}
          />
        </div>

        {/* Right Content - Projects */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={["Projects"]}
            variant="desktop"
          />

          {activeTab === "Projects" && (
            <ProjectsSection projects={projects}>
              {isCurrentUser && (
                <Link href="/projects/add-project">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-primary text-white"
                  >
                    <HiPlus size={16} />
                    <span>Add Project</span>
                  </Button>
                </Link>
              )}
            </ProjectsSection>
          )}
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
            research_interests={profileData.research_interests}
            bio={profileData.bio}
          />
        )}
        {activeTab === "Projects" && (
          <ProjectsSection projects={projects}>
            {isCurrentUser && (
              <Link href="/projects/add-project">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-primary text-white"
                >
                  <HiPlus size={16} />
                  <span>Add Project</span>
                </Button>
              </Link>
            )}
          </ProjectsSection>
        )}
      </div>
    </>
  );
}
