"use client";

import { useState } from "react";
import {
  HiShare,
  HiPencil,
  HiLocationMarker,
  HiMail,
  HiFilter,
  HiPlus,
  HiExternalLink,
  HiUsers,
} from "react-icons/hi";

interface Publication {
  title: string;
  journal: string;
  volume: string;
  date: string;
  description: string;
  tags: string[];
  citations: number;
  authors: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "About" | "Publications" | "Projects"
  >("Publications");

  const publications: Publication[] = [
    {
      title: "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
      journal: "Journal of Climate Research",
      volume: "Volume 45, Issue 3",
      date: "May 2024",
      description:
        "This paper presents findings from a long-term study on the effects of climate change on Himalayan glaciers, with a focus on the Khumbu region of Nepal. Using satellite imagery and field measurements, we document significant glacial retreat over the past decade and project future changes under various climate scenarios.",
      tags: ["Climate Change", "Glaciology", "Remote Sensing"],
      citations: 45,
      authors: "John Doe, Jane Smith, Robert Johnson",
    },
    {
      title: "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
      journal: "Journal of Climate Research",
      volume: "Volume 45, Issue 3",
      date: "May 2023",
      description:
        "This paper presents findings from a long-term study on the effects of climate change on Himalayan glaciers, with a focus on the Khumbu region of Nepal. Using satellite imagery and field measurements, we document significant glacial retreat over the past decade and project future changes under various climate scenarios.",
      tags: ["Climate Change", "Glaciology", "Remote Sensing"],
      citations: 40,
      authors: "John Doe, Jane Smith, Robert Johnson",
    },
    {
      title: "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
      journal: "Journal of Climate Research",
      volume: "Volume 45, Issue 3",
      date: "May 2022",
      description:
        "This paper presents findings from a long-term study on the effects of climate change on Himalayan glaciers, with a focus on the Khumbu region of Nepal. Using satellite imagery and field measurements, we document significant glacial retreat over the past decade and project future changes under various climate scenarios.",
      tags: ["Climate Change", "Glaciology", "Remote Sensing"],
      citations: 35,
      authors: "John Doe, Jane Smith, Robert Johnson",
    },
  ];

  const researchInterests = [
    "Climate Change",
    "Glaciology",
    "Environmental Science",
    "Sustainable Development",
    "Mountain Ecosystems",
  ];

  const AboutSection = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">About</h3>

      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="w-4 h-4 bg-gray-300 rounded flex-shrink-0"></div>
          <span className="text-sm">Kathmandu University</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <HiLocationMarker size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm">Dhulikhel, Nepal</span>
        </div>
        <div className="flex items-start space-x-3 text-gray-600">
          <div className="w-4 h-4 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
          <span className="text-sm">
            PhD in Environmental Science, University of Cambridge (2018)
          </span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <HiMail size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm break-all">j.doe@ku.edu.np</span>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">RESEARCH INTERESTS</h4>
        <div className="flex flex-wrap gap-2">
          {researchInterests.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-sm font-medium border border-teal-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">BIO</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Dr. John Doe is an Associate Professor in the Department of
          Environmental Science at Kathmandu University. His research primarily
          focuses on climate change impacts on mountain ecosystems, with a
          particular emphasis on glacial retreat in the Himalayas.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="bg-teal-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 text-sm hover:bg-teal-700 transition-colors shadow-sm">
          <HiUsers size={16} />
          <span>Follow</span>
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 text-sm hover:bg-gray-50 transition-colors">
          <span>Message</span>
        </button>
      </div>
    </div>
  );

  const PublicationsSection = () => (
    <div className=" rounded-xl ">
      <div className="p-6 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Publications</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg text-sm transition-colors">
              <HiFilter size={16} />
              <span>Filter</span>
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm hover:bg-teal-700 transition-colors shadow-sm">
              <HiPlus size={16} />
              <span>Add Publication</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-3 hover:text-teal-600 cursor-pointer transition-colors">
                {pub.title}
              </h3>
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">{pub.journal}</span> •{" "}
                {pub.volume} • {pub.date}
              </div>
              <p className="text-gray-700 text-sm mb-5 leading-relaxed">
                {pub.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {pub.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>📄</span>
                    <span>Citations: {pub.citations}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <HiUsers size={14} />
                    <span className="line-clamp-1">
                      Co-authors: {pub.authors}
                    </span>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-2 transition-colors self-start lg:self-center">
                  <span>View full publication</span>
                  <HiExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectsSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
      <p className="text-gray-600">Projects content coming soon...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-6 sm:p-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col  items-center  space-y-4 lg:space-x-8">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="text-center flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Dr. John Doe
                </h1>
                <p className="text-teal-100 text-sm sm:text-base">
                  Associate Professor, Department of Environmental Science
                </p>
              </div>
            </div>

            {/* Action Buttons */}
          </div>
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors shadow-md">
                <HiShare size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="bg-teal-600 hover:bg-teal-800 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors shadow-md">
                <HiPencil size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="xl:hidden">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {(["About", "Publications", "Projects"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden xl:grid xl:grid-cols-3 gap-6">
          {/* Left Sidebar - About */}
          <div className="xl:col-span-1">
            <AboutSection />
          </div>

          {/* Right Content - Publications/Projects */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-6 border-b border-gray-200">
              {(["Publications", "Projects"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
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

            {activeTab === "Publications" && <PublicationsSection />}
            {activeTab === "Projects" && <ProjectsSection />}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="xl:hidden">
          {activeTab === "About" && <AboutSection />}
          {activeTab === "Publications" && <PublicationsSection />}
          {activeTab === "Projects" && <ProjectsSection />}
        </div>
      </div>
    </div>
  );
}
