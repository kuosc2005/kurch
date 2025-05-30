"use client";
import React, { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    title: "Associate Professor",
    department: "Department of Environmental Science",
    bio: "Dr. John Doe is an Associate Professor in the Department of Environmental Science at Kathmandu University. His research focuses on climate change impacts on mountain ecosystems, with a particular emphasis on glacial retreat in the Himalayas. He has published over 30 peer-reviewed articles and has led multiple international research collaborations.",
    website: "https://your-website.com",
    orcidId: "0000-0000-0000-0000",
    googleScholar: "",
    researchInterests: [
      "Climate Change",
      "Glaciology",
      "Environmental Science",
      "Sustainable Development",
      "Mountain Ecosystems",
    ],
  });

  const [newInterest, setNewInterest] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addResearchInterest = () => {
    if (
      newInterest.trim() &&
      !formData.researchInterests.includes(newInterest.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        researchInterests: [...prev.researchInterests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeResearchInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      researchInterests: prev.researchInterests.filter(
        (item) => item !== interest
      ),
    }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white rounded-lg shadow-lg  p-12">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Profile Information
            </h2>
            <p className="text-gray-500">
              Update your personal and professional information.
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Picture and Name Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 space-y-6 lg:space-y-0">
              {/* Profile Picture */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex space-x-3 mt-3">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Change
                  </button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Remove
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="Department of Environmental Science">
                  Department of Environmental Science
                </option>
                <option value="Department of Computer Science">
                  Department of Computer Science
                </option>
                <option value="Department of Mathematics">
                  Department of Mathematics
                </option>
                <option value="Department of Physics">
                  Department of Physics
                </option>
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Research Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Interests
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.researchInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-teal-50 text-teal-700 border border-teal-200"
                  >
                    {interest}
                    <button
                      onClick={() => removeResearchInterest(interest)}
                      className="ml-2 text-teal-500 hover:text-teal-700 font-medium"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add a research interest"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === "Enter" && addResearchInterest()}
                />
                <button
                  onClick={addResearchInterest}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://your-website.com"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* ORCID ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ORCID ID
              </label>
              <input
                type="text"
                value={formData.orcidId}
                onChange={(e) => handleInputChange("orcidId", e.target.value)}
                placeholder="0000-0000-0000-0000"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Google Scholar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Scholar
              </label>
              <input
                type="text"
                value={formData.googleScholar}
                onChange={(e) =>
                  handleInputChange("googleScholar", e.target.value)
                }
                placeholder="Google Scholar profile URL"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
