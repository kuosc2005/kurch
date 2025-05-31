import { ProfileData } from "@/types/profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";

// This would typically come from a database or API
function getProfileData(): ProfileData {
  return {
    name: "Dr. John Doe",
    title: "Associate Professor, Department of Environmental Science",
    university: "Kathmandu University",
    location: "Dhulikhel, Nepal",
    email: "j.doe@ku.edu.np",
    education: "PhD in Environmental Science, University of Cambridge (2018)",
    bio: "Dr. John Doe is an Associate Professor in the Department of Environmental Science at Kathmandu University. His research primarily focuses on climate change impacts on mountain ecosystems, with a particular emphasis on glacial retreat in the Himalayas.",
    researchInterests: [
      "Climate Change",
      "Glaciology",
      "Environmental Science",
      "Sustainable Development",
      "Mountain Ecosystems",
    ],
    publications: [
      {
        title:
          "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
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
        title:
          "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
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
        title:
          "Climate Change Effects on Himalayan Glaciers: A Long-term Study",
        journal: "Journal of Climate Research",
        volume: "Volume 45, Issue 3",
        date: "May 2022",
        description:
          "This paper presents findings from a long-term study on the effects of climate change on Himalayan glaciers, with a focus on the Khumbu region of Nepal. Using satellite imagery and field measurements, we document significant glacial retreat over the past decade and project future changes under various climate scenarios.",
        tags: ["Climate Change", "Glaciology", "Remote Sensing"],
        citations: 35,
        authors: "John Doe, Jane Smith, Robert Johnson",
      },
    ],
  };
}

interface Params {
  id: number;
}

export default async function ProfilePage({ params }: { params: Params }) {
  const { id } = await params;
  const profileData = getProfileData();
  const isCurrentUser = Number(id) === 0;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <ProfileHeader
          name={profileData.name}
          title={profileData.title}
          isCurrentUser={isCurrentUser}
        />

        <ProfileContent
          profileData={profileData}
          isCurrentUser={isCurrentUser}
        />
      </div>
    </div>
  );
}
