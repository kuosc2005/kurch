import { ProfileData } from "@/types/profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { headers } from "next/headers";

async function getRealProfileData(id: string): Promise<ProfileData | null> {
  try {
    const headersList = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/profile/${id}`, {
      headers: {
        Cookie: headersList.get("cookie") || "",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
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

  const realProfileData = await getRealProfileData(id);
  console.log(realProfileData);
  //The profileData needs to be fetched by passing the id.

  if (realProfileData) {
    realProfileData.publications = [];
  }

  if (!realProfileData) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600">
            The requested user profile could not be found.
          </p>
        </div>
      </div>
    );
  }

  if (!realProfileData) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600">
            The requested user profile could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <ProfileHeader
          name={realProfileData.name}
          title={realProfileData.title}
          department={realProfileData.department}
          isCurrentUser={isCurrentUser}
        />

        <ProfileContent
          profileData={realProfileData}
          isCurrentUser={isCurrentUser}
        />
      </div>
    </div>
  );
}
