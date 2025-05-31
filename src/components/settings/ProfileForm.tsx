"use client";
import InputField from "@/components/ui/InputField";
import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import PersonalInfoSection from "./PersonalInfoSection";
import ResearchInterestsSection from "./ResearchInterestsSection";
import ExternalLinksSection from "./ExternalLinksSection";
import Button from "../ui/button";

export default function ProfileForm() {
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
    <div className="bg-white rounded-lg shadow-lg p-12">
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
        <div className="flex flex-col md:flex-row lg:items-start justify-center lg:space-x-6 space-y-6 lg:space-y-0">
          <ProfilePicture>
            <Button className="my-2">Change</Button>
            <Button className="my-2">Remove</Button>
          </ProfilePicture>

          {/* Name Fields */}
          <div className="flex-1 grid lg:grid-cols-1  gap-4 lg:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>
        </div>

        <PersonalInfoSection
          formData={formData}
          onInputChange={handleInputChange}
        />

        <ResearchInterestsSection
          interests={formData.researchInterests}
          newInterest={newInterest}
          onNewInterestChange={setNewInterest}
          onAddInterest={addResearchInterest}
          onRemoveInterest={removeResearchInterest}
        />

        <ExternalLinksSection
          formData={formData}
          onInputChange={handleInputChange}
        />
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
  );
}
