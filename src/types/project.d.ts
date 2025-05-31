// Reusable types
interface Collaborator {
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
  updatedAt: string;
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
  overview: string;
  categories: string[];
}
