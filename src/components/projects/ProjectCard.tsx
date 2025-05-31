interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  collaborators: Array<{ name: string; avatar: string }>;
  updatedAt: string;
  semester: string;
  fieldOfStudy: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          <span className="text-sm text-gray-600">Collaborators:</span>
          <div className="flex -space-x-2">
            {project.collaborators.slice(0, 3).map((collaborator, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
              >
                {collaborator.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {project.collaborators.map((c) => c.name.split(" ")[0]).join(", ")}
          </span>
        </div>

        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Uploaded {project.updatedAt}
      </div>
    </div>
  );
}
