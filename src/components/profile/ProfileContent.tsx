"use client";

import { useState } from "react";
import { ProfileData } from "../../types/profile";
import { AboutSection } from "./AboutSection";
import { PublicationsSection } from "@/components/profile/PublicationsSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { TabNavigation, TabType } from "./TabNavigation";
import { Button } from "../ui/RadixButton";
import { HiFilter, HiPlus } from "react-icons/hi";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Radiology Tagging System",
    description: "An annotation Platform for radiologists",
    tags: ["React.js", "TypeScript", "PostgreSQL"],
    collaborators: [{ name: "Ashwin Imma", avatar: "/api/placeholder/32/32" }],
    updatedAt: "2 days ago",
    semester: "1st Sem",
    fieldOfStudy: "Computer Science",
    technologies: ["React", "TypeScript", "PostgreSQL"],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Full-stack online shopping platform with payment integration",
    tags: ["Next.js", "Node.js", "MongoDB"],
    collaborators: [
      { name: "John Doe", avatar: "/api/placeholder/32/32" },
      { name: "Jane Smith", avatar: "/api/placeholder/32/32" },
    ],
    updatedAt: "1 week ago",
    semester: "2nd Sem",
    fieldOfStudy: "Computer Engineering",
    technologies: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    id: "3",
    title: "AI Chatbot Assistant",
    description: "Intelligent chatbot using natural language processing",
    tags: ["Python", "TensorFlow", "Flask"],
    collaborators: [
      { name: "Sarah Connor", avatar: "/api/placeholder/32/32" },
      { name: "Alex Turner", avatar: "/api/placeholder/32/32" },
    ],
    updatedAt: "3 days ago",
    semester: "3rd Sem",
    fieldOfStudy: "Artificial Intelligence",
    technologies: ["Python", "TensorFlow", "Flask"],
  },
  {
    id: "4",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication",
    tags: ["React Native", "Firebase", "Node.js"],
    collaborators: [{ name: "David Kim", avatar: "/api/placeholder/32/32" }],
    updatedAt: "5 days ago",
    semester: "4th Sem",
    fieldOfStudy: "Cybersecurity",
    technologies: ["React Native", "Firebase", "Node.js"],
  },
];

interface ProfileContentProps {
  profileData: ProfileData;
  isCurrentUser: boolean;
}

export function ProfileContent({
  profileData,
  isCurrentUser,
}: ProfileContentProps) {
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
            <PublicationsSection publications={profileData.publications}>
              {isCurrentUser && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-primary text-white"
                >
                  <HiPlus size={16} />
                  <span>Add Publication</span>
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="bg-gray-100 text-black border-1 border-gray-300"
              >
                <HiFilter size={16} />
                <span>Filter</span>
              </Button>
            </PublicationsSection>
          )}
          {activeTab === "Projects" && (
            <ProjectsSection projects={mockProjects}>
              {isCurrentUser && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-primary text-white"
                >
                  <HiPlus size={16} />
                  <span>Add Project</span>
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                className="bg-gray-100 text-black border-1 border-gray-300"
              >
                <HiFilter size={16} />
                <span>Filter</span>
              </Button>
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
            researchInterests={profileData.researchInterests}
            bio={profileData.bio}
          />
        )}
        {activeTab === "Publications" && (
          <PublicationsSection publications={profileData.publications}>
            {isCurrentUser && (
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary text-white"
              >
                <HiPlus size={16} />
                <span>Add Publication</span>
              </Button>
            )}
            <Button variant="outline">
              <HiFilter size={16} />
              <span>Filter</span>
            </Button>
          </PublicationsSection>
        )}
        {activeTab === "Projects" && (
          <ProjectsSection projects={mockProjects}>
            {isCurrentUser && (
              <Button variant="outline">
                <HiPlus size={16} />
                <span>Add Publication</span>
              </Button>
            )}
            <Button variant="outline">
              <HiFilter size={16} />
              <span>Filter</span>
            </Button>
          </ProjectsSection>
        )}
      </div>
    </>
  );
}
