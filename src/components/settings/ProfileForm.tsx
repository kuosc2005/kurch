"use client";
import InputField from "@/components/ui/InputField";
import React, { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import PersonalInfoSection from "./PersonalInfoSection";
import ResearchInterestsSection from "./ResearchInterestsSection";
import ExternalLinksSection from "./ExternalLinksSection";
import { Button } from "../ui/RadixButton";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  location: string;
  education: string;
  bio: string;
  website: string;
  orcidId: string;
  googleScholar: string;
  researchInterests: string[];
};

export default function ProfileForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    location: "",
    education: "",
    bio: "",
    website: "",
    orcidId: "",
    googleScholar: "",
    researchInterests: [],
  });

  const [loading, setLoading] = useState(true);
  const [newInterest, setNewInterest] = useState("");

  // Fetch profile data when component mounts and session is available
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/profile/${session?.user.id}`);

        if (response.ok) {
          const profileData = await response.json();

          console.log(profileData);

          // Split the name from API into firstName and lastName
          const nameParts = (profileData.name || "").split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setFormData({
            firstName,
            lastName,
            title: profileData.title || "",
            department: profileData.department || "",
            location: profileData.location || "",
            education: profileData.education || "",
            bio: profileData.bio || "",
            website: profileData.website || "",
            orcidId: profileData.orcid || "",
            googleScholar: profileData.google_scholar || "",
            researchInterests: profileData.research_interests || [],
          });
        } else if (response.status === 404) {
          console.log("Profile not found, using default values");
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [session?.user.id]);

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

  const handleSave = async () => {
    try {
      // Combine firstName and lastName into a single name field
      const fullName =
        `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

      const response = await fetch(`/api/profile/${session?.user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          title: formData.title,
          department: formData.department,
          location: formData.location,
          education: formData.education,
          bio: formData.bio,
          website: formData.website,
          orcid_id: formData.orcidId,
          google_scholar: formData.googleScholar,
          research_interests: formData.researchInterests,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile Updated Successfully!");
      setTimeout(() => {
        router.push(`/profile/${session?.user.id}`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Update Profile. Please Try Again.");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

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
            <Button size="sm" className="my-2 w-full text-white">
              Change
            </Button>
            <Button size="sm" className="my-2 w-full text-white">
              Remove
            </Button>
          </ProfilePicture>

          {/* Name Fields */}
          <div className="flex-1 grid lg:grid-cols-1 gap-4 lg:gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education
              </label>
              <InputField
                variant="alt"
                type="text"
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                placeholder="Highest degree, Institution"
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
        <Button onClick={handleSave} size="lg" className="text-white">
          Save
        </Button>
      </div>
    </div>
  );
}
