import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { ActionButtons } from "@/components/projects/ActionButtons";

// Mock data - in real app this would come from API based on [id]
const mockProject: ProjectDetails = {
  id: "1",
  title: "Radiology Tagging System",
  description: "An annotation Platform for radiologists",
  tags: [
    "React JS",
    "TypeScript",
    "PostgreSQL",
    "Node.js",
    "Express",
    "TensorFlow",
  ],
  collaborators: [
    {
      name: "Ashwini Patel",
      role: "Full Stack Developer",
      email: "ashwini@example.com",
      avatar: "/api/placeholder/64/64",
    },
    {
      name: "Innima Shah",
      role: "UI/UX Designer",
      email: "innima@example.com",
      avatar: "/api/placeholder/64/64",
    },
    {
      name: "Dr. Sarah Wilson",
      role: "Medical Advisor",
      email: "sarah.wilson@hospital.com",
      avatar: "/api/placeholder/64/64",
    },
  ],
  updatedAt: "2 days ago",
  semester: "6th Sem",
  fieldOfStudy: "Computer Science",
  technologies: ["React", "TypeScript", "PostgreSQL"],
  views: 1247,
  forks: 23,
  likes: 89,
  shares: 156,
  categories: ["Web Application", "Healthcare", "AI", "Medical Imaging"],
  overview:
    "The Radiology Tagging System is a comprehensive web-based platform designed to streamline the annotation process for radiologists. This system allows medical professionals to efficiently tag, categorize, and manage radiological images with advanced AI-powered assistance. The platform features real-time collaboration, automated image analysis, and comprehensive reporting tools that significantly improve workflow efficiency in medical imaging departments.",
};

export default function ProjectDetailPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mockProject.title}
              </h1>
              <p className="text-gray-600 mb-4">{mockProject.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mockProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <ActionButtons project={mockProject} />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {mockProject.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {mockProject.views} views
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              {mockProject.forks} forks
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Uploaded {mockProject.updatedAt}
            </span>
            <span>{mockProject.semester}</span>
            <span>{mockProject.fieldOfStudy}</span>
          </div>
        </div>

        {/* Collaborators Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">
              Collaborators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockProject.collaborators.map((collaborator, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium text-gray-600">
                  {collaborator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {collaborator.name}
                  </h3>
                  <p className="text-sm text-gray-600">{collaborator.role}</p>
                  <p className="text-sm text-gray-500">{collaborator.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-y-6">
          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Project Overview
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {mockProject.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
