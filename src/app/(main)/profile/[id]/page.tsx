import { ProfileData } from "@/types/profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// This would typically come from a database or API
function getProfileData(): ProfileData {
  return {
    name: "Dr. John Doe",
    title: "Associate Professor",
    department: "Department of Environmental Science",
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

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Check if the id in the url is same as the user's : if yes , only then we allow editing.

  const session = await getServerSession(authOptions);
  const isCurrentUser = id === session?.user?.id;

  //The profileData needs to be fetched by passing the id.
  const profileData = getProfileData();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <ProfileHeader
          name={profileData.name}
          title={profileData.title}
          department={profileData.department}
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
