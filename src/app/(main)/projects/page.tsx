import ProjectsClient from "@/components/projects/ProjectsClient";
import { Suspense } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/RadixButton";
import MainContent from "@/components/Layout/MainContent";

const filterOptions = {
  semesters: [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ],
  fieldsOfStudy: [
    "Computer Science",
    "Computer Engineering",
    "Electronics Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Cybersecurity",
  ],
  technologies: [
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
  ],
};

async function getProjectData(): Promise<Project[] | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/projects/`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      console.error("Failed to fetch projects:", response.status);
      return null;
    }

    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return null;
    }

    // No need for additional formatting since the API now handles it
    return data;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <HiOutlineDocumentAdd className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No projects yet
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Be the first to share your project with the community.
        </p>
        <div className="mt-6">
          <Link href="/projects/add-project">
            <Button className="bg-primary text-white">Add Your Project</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-96 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ProjectsPage() {
  const data = await getProjectData();

  return (
    <MainContent>
      <div className="container mx-auto">
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

          {/* Client-side filtering and search */}
          <Suspense fallback={<LoadingState />}>
            {!data || data.length === 0 ? (
              <EmptyState />
            ) : (
              <ProjectsClient projects={data} filterOptions={filterOptions} />
            )}
          </Suspense>
        </div>
      </div>
    </MainContent>
  );
}
