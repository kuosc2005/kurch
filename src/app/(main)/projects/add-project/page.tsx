"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/RadixButton";
import { HiPlus, HiX } from "react-icons/hi";
import { useSession } from "next-auth/react";

interface ProjectFormData {
  title: string;
  description: string;
  abstract: string;
  tags: string[];
  semester: string;
  fieldOfStudy: string;
  technologies: string[];
  categories: string[];
  github_link: string;
  report_link: string;
  collaborators: {
    name: string;
    role: string;
    email: string;
  }[];
}

export default function AddProjectPage() {
  const sessionDetails = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    abstract: "",
    tags: [],
    semester: "",
    fieldOfStudy: "",
    technologies: [],
    categories: [],
    collaborators: [],
    github_link: "",
    report_link: "",
  });

  const [newTag, setNewTag] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCollaborator, setNewCollaborator] = useState({
    name: "",
    role: "",
    email: "",
  });

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const addCategory = () => {
    if (
      newCategory.trim() &&
      !formData.categories.includes(newCategory.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const addCollaborator = () => {
    if (
      newCollaborator.name.trim() &&
      newCollaborator.role.trim() &&
      newCollaborator.email.trim() &&
      !formData.collaborators.some(
        (c) => c.email === newCollaborator.email.trim()
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        collaborators: [
          ...prev.collaborators,
          {
            name: newCollaborator.name.trim(),
            role: newCollaborator.role.trim(),
            email: newCollaborator.email.trim(),
          },
        ],
      }));
      setNewCollaborator({ name: "", role: "", email: "" });
    }
  };

  const removeCollaborator = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((c) => c.email !== email),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (!formData.abstract.trim()) {
      toast.error("Abstract is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add current user as project owner to collaborators before sending
      const collaboratorsWithOwner = [
        {
          name: sessionDetails.data?.user?.name || "Current User",
          role: "Project Owner",
          email: sessionDetails.data?.user?.email || "",
        },
        ...formData.collaborators,
      ];

      const payload = {
        title: formData.title,
        description: formData.description,
        abstract: formData.abstract,
        tags: formData.tags,
        semester: formData.semester,
        fieldOfStudy: formData.fieldOfStudy,
        technologies: formData.technologies,
        categories: formData.categories,
        github_link: formData.github_link,
        report_link: formData.report_link,
        collaborators: collaboratorsWithOwner,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (sessionDetails.data?.user.id) {
        headers["x-user-id"] = sessionDetails.data.user.id;
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create project");
      }

      toast.success("Project created successfully!");
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create project. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Project
          </h1>
          <p className="text-gray-600">Share your project with the community</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <InputField
              variant="alt"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter your project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Brief description of your project"
              required
            />
          </div>

          {/* Overview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abstract
            </label>
            <textarea
              value={formData.abstract}
              onChange={(e) => handleInputChange("abstract", e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Detailed overview of your project"
            />
          </div>

          {/* Semester and Field of Study */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.semester}
                onChange={(e) => handleInputChange("semester", e.target.value)}
                placeholder="e.g., Fall 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.fieldOfStudy}
                onChange={(e) =>
                  handleInputChange("fieldOfStudy", e.target.value)
                }
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          {/* GitHub and Report Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Link
              </label>
              <InputField
                variant="alt"
                type="url"
                value={formData.github_link}
                onChange={(e) =>
                  handleInputChange("github_link", e.target.value)
                }
                placeholder="https://github.com/username/project"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Link
              </label>
              <InputField
                variant="alt"
                type="url"
                value={formData.report_link}
                onChange={(e) =>
                  handleInputChange("report_link", e.target.value)
                }
                placeholder="https://example.com/report.pdf"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-teal-50 text-teal-700 border border-teal-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-teal-500 hover:text-teal-700 font-medium"
                  >
                    <HiX size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <InputField
                variant="alt"
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTag}
                size="sm"
                className="text-white"
              >
                <HiPlus size={16} />
              </Button>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-2 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    <HiX size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <InputField
                variant="alt"
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a technology"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addTechnology}
                size="sm"
                className="text-white"
              >
                <HiPlus size={16} />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.categories.map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-purple-50 text-purple-700 border border-purple-200"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-2 text-purple-500 hover:text-purple-700 font-medium"
                  >
                    <HiX size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <InputField
                variant="alt"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add a category"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addCategory}
                size="sm"
                className="text-white"
              >
                <HiPlus size={16} />
              </Button>
            </div>
          </div>

          {/* Collaborators */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collaborators
            </label>

            {/* Existing Collaborators */}
            <div className="space-y-2 mb-4">
              {formData.collaborators.map((collaborator, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                      {collaborator.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {collaborator.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {collaborator.role} • {collaborator.email}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collaborator.email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <HiX size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Collaborator */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <InputField
                variant="alt"
                type="text"
                value={newCollaborator.name}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Collaborator name"
              />
              <InputField
                variant="alt"
                type="text"
                value={newCollaborator.role}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                placeholder="Role (e.g., Developer, Designer)"
              />
              <InputField
                variant="alt"
                type="email"
                value={newCollaborator.email}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="Email address"
              />
            </div>
            <Button
              type="button"
              onClick={addCollaborator}
              size="sm"
              className="text-white"
            >
              <HiPlus size={16} className="mr-2" />
              Add Collaborator
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              onClick={() => router.back()}
              size="lg"
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="text-white"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
