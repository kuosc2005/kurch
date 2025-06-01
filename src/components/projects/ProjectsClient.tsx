"use client";

import { useState } from "react";
import SearchAndFilter from "./SearchAndFilter";
import ProjectCard from "./ProjectCard";

interface FilterOptions {
  semesters: string[];
  fieldsOfStudy: string[];
  technologies: string[];
}

interface ProjectsClientProps {
  projects: Project[];
  filterOptions: FilterOptions;
}

export default function ProjectsClient({
  projects,
  filterOptions,
}: ProjectsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      selectedSemesters.length === 0 ||
      selectedSemesters.includes(project.semester);
    const matchesField =
      selectedFields.length === 0 ||
      selectedFields.includes(project.field_of_study);
    const matchesTech =
      selectedTechnologies.length === 0 ||
      selectedTechnologies.some((tech) => project.technologies.includes(tech));

    return matchesSearch && matchesSemester && matchesField && matchesTech;
  });

  const resetFilters = () => {
    setSelectedSemesters([]);
    setSelectedFields([]);
    setSelectedTechnologies([]);
    setSearchTerm("");
  };

  return (
    <>
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSemesters={selectedSemesters}
        setSelectedSemesters={setSelectedSemesters}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        selectedTechnologies={selectedTechnologies}
        setSelectedTechnologies={setSelectedTechnologies}
        filterOptions={filterOptions}
        resetFilters={resetFilters}
      />

      {/* Project Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
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
    </>
  );
}
