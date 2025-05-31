import ProjectCard from "../projects/ProjectCard";

interface PublicationsSectionProps {
  projects: Project[];
  children: React.ReactNode;
}

export function ProjectsSection({
  projects,
  children,
}: PublicationsSectionProps) {
  return (
    <div className="rounded-xl">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
          <div className="flex flex-col sm:flex-row gap-3">{children}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {projects.map((pub, index) => (
            <ProjectCard key={index} project={pub} />
          ))}
        </div>
      </div>
    </div>
  );
}
