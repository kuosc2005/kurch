// Reusable types
interface Collaborator {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface BaseProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  updated_at: string;
  semester: string;
  fieldOfStudy: string;
  technologies: string[];
}

interface Project extends BaseProject {
  collaborators: SimpleCollaborator[];
}

type SimpleCollaborator = Pick<Collaborator, "name" | "avatar">;

interface ProjectDetails extends BaseProject {
  collaborators: Collaborator[];
  views: number;
  forks: number;
  likes: number;
  shares: number;
  abstract: string;
  github_link: string;
  report_link: string;
  categories: string[];
}
