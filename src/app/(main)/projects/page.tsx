import { baseUrl } from "@/app/constants";
import ProjectsClient from "@/components/projects/ProjectsClient";

const filterOptions = {
  semesters: [
    "1st Sem",
    "2nd Sem",
    "3rd Sem",
    "4th Sem",
    "5th Sem",
    "6th Sem",
    "7th Sem",
    "8th Sem",
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
    const response = await fetch(`${baseUrl}/api/projects/`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (!response) return null;
    const formattedData = data.map((proj: Project) => {
      return {
        ...proj,
        updated_at: proj.updated_at ? proj.updated_at.toString() : "",
      };
    });
    return formattedData;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
}

export default async function ProjectsPage() {
  const data = await getProjectData();

  if (data?.length == 0 || !data) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
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

        <ProjectsClient projects={data!} filterOptions={filterOptions} />
      </div>
    </div>
  );
}
