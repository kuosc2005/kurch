"use client";

import { useState } from "react";
import { Search, Filter, X, RotateCcw } from "lucide-react";

interface FilterOptions {
  semesters: string[];
  fieldsOfStudy: string[];
  technologies: string[];
}

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSemesters: string[];
  setSelectedSemesters: (semesters: string[]) => void;
  selectedFields: string[];
  setSelectedFields: (fields: string[]) => void;
  selectedTechnologies: string[];
  setSelectedTechnologies: (technologies: string[]) => void;
  filterOptions: FilterOptions;
  resetFilters: () => void;
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedSemesters,
  setSelectedSemesters,
  selectedFields,
  setSelectedFields,
  selectedTechnologies,
  setSelectedTechnologies,
  filterOptions,
  resetFilters,
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

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

  const hasActiveFilters =
    selectedSemesters.length > 0 ||
    selectedFields.length > 0 ||
    selectedTechnologies.length > 0;

  const activeFilterChips = [
    ...selectedSemesters.map((s) => ({ type: "semester", value: s })),
    ...selectedFields.map((f) => ({ type: "field", value: f })),
    ...selectedTechnologies.map((t) => ({ type: "technology", value: t })),
  ];

  return (
    <div className="rounded-lg border-gray-200 mb-6">
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
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-200 rounded-lg transition-colors md:px-4 sm:px-3 sm:gap-2"
        >
          <Filter className="w-4 h-4 " />
          <span className="hidden sm:inline"> Filters</span>
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
              {filterOptions.semesters.map((semester) => (
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
                  <span className="ml-2 text-sm text-gray-700">{semester}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Field of Study Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Field of Study</h3>
            <div className="space-y-2">
              {filterOptions.fieldsOfStudy.map((field) => (
                <label key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={() =>
                      toggleFilter(field, selectedFields, setSelectedFields)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{field}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Technologies Filter */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Technologies</h3>
            <div className="space-y-2">
              {filterOptions.technologies.map((tech) => (
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
  );
}
