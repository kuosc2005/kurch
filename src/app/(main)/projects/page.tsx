"use client";

import { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  collaborators: Array<{ name: string; avatar: string }>;
  updatedAt: string;
  semester: string;
  fieldOfStudy: string;
  technologies: string[];
}

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

const semesters = [
  "1st Sem",
  "2nd Sem",
  "3rd Sem",
  "4th Sem",
  "5th Sem",
  "6th Sem",
  "7th Sem",
  "8th Sem",
];
const fieldsOfStudy = [
  "Computer Science",
  "Computer Engineering",
  "Electronics Engineering",
  "Artificial Intelligence",
  "Data Science",
  "Cybersecurity",
];
const technologies = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "TensorFlow",
  "React Native",
  "Arduino",
  "Blockchain",
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const toggleFilter = (
    item: string,
    selected: string[],
    setter: (items: string[]) => void
  ) => {
    if (selected.includes(item)) {
      setter(selected.filter((i) => i !== item));
    } else {
      setter([...selected, item]);
    }
  };

  const resetFilters = () => {
    setSelectedSemesters([]);
    setSelectedFields([]);
    setSelectedTechnologies([]);
    setSearchTerm("");
  };

  const hasActiveFilters =
    selectedSemesters.length > 0 ||
    selectedFields.length > 0 ||
    selectedTechnologies.length > 0;

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      selectedSemesters.length === 0 ||
      selectedSemesters.includes(project.semester);
    const matchesField =
      selectedFields.length === 0 ||
      selectedFields.includes(project.fieldOfStudy);
    const matchesTech =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.some((tech) => project.technologies.includes(tech));

    return matchesSearch && matchesSemester && matchesField && matchesTech;
  });

  const activeFilterChips = [
    ...selectedSemesters.map((s) => ({ type: "semester", value: s })),
    ...selectedFields.map((f) => ({ type: "field", value: f })),
    ...selectedTechnologies.map((t) => ({ type: "technology", value: t })),
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Showcase
          </h1>
          <p className="text-gray-600">
            Discover amazing semester projects from students across different
            fields
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className=" rounded-lg  border-gray-200 mb-6">
          <div className="flex gap-4 items-center mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors md:px-4 sm:px-3 sm:gap-0"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Active Filter Chips */}
          {activeFilterChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilterChips.map((chip, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {chip.value}
                  <button
                    onClick={() => {
                      if (chip.type === "semester") {
                        setSelectedSemesters((prev) =>
                          prev.filter((s) => s !== chip.value)
                        );
                      } else if (chip.type === "field") {
                        setSelectedFields((prev) =>
                          prev.filter((f) => f !== chip.value)
                        );
                      } else {
                        setSelectedTechnologies((prev) =>
                          prev.filter((t) => t !== chip.value)
                        );
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Filters
                </button>
              )}
            </div>
          )}

          {/* Filter Sections */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              {/* Semester Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Semester</h3>
                <div className="space-y-2">
                  {semesters.map((semester) => (
                    <label key={semester} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSemesters.includes(semester)}
                        onChange={() =>
                          toggleFilter(
                            semester,
                            selectedSemesters,
                            setSelectedSemesters
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {semester}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field of Study Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Field of Study
                </h3>
                <div className="space-y-2">
                  {fieldsOfStudy.map((field) => (
                    <label key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFields.includes(field)}
                        onChange={() =>
                          toggleFilter(field, selectedFields, setSelectedFields)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {field}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technologies Filter */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Technologies</h3>
                <div className="space-y-2">
                  {technologies.map((tech) => (
                    <label key={tech} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTechnologies.includes(tech)}
                        onChange={() =>
                          toggleFilter(
                            tech,
                            selectedTechnologies,
                            setSelectedTechnologies
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                  <span className="text-sm text-gray-600">Collaborators:</span>
                  <div className="flex -space-x-2">
                    {project.collaborators
                      .slice(0, 3)
                      .map((collaborator, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                        >
                          {collaborator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {project.collaborators
                      .map((c) => c.name.split(" ")[0])
                      .join(", ")}
                  </span>
                </div>

                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
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
                Uploaded {project.updatedAt}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No projects found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
