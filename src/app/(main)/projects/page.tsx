import ProjectsClient from "@/components/projects/ProjectsClient";

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Radiology Tagging System",
    description: "An annotation Platform for radiologists",
    tags: ["React.js", "TypeScript", "PostgreSQL"],
    collaborators: [{ name: "Ashwin Imma", avatar: "/api/placeholder/32/32" }],
    updatedAt: "2 days ago",
    semester: "1st Sem",
    fieldOfStudy: "Computer Science",
    technologies: ["React", "TypeScript", "PostgreSQL"],
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Full-stack online shopping platform with payment integration",
    tags: ["Next.js", "Node.js", "MongoDB"],
    collaborators: [
      { name: "John Doe", avatar: "/api/placeholder/32/32" },
      { name: "Jane Smith", avatar: "/api/placeholder/32/32" },
    ],
    updatedAt: "1 week ago",
    semester: "2nd Sem",
    fieldOfStudy: "Computer Engineering",
    technologies: ["Next.js", "Node.js", "MongoDB"],
  },
  {
    id: "3",
    title: "AI Chatbot Assistant",
    description: "Intelligent chatbot using natural language processing",
    tags: ["Python", "TensorFlow", "Flask"],
    collaborators: [
      { name: "Sarah Connor", avatar: "/api/placeholder/32/32" },
      { name: "Alex Turner", avatar: "/api/placeholder/32/32" },
    ],
    updatedAt: "3 days ago",
    semester: "3rd Sem",
    fieldOfStudy: "Artificial Intelligence",
    technologies: ["Python", "TensorFlow", "Flask"],
  },
  {
    id: "4",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication",
    tags: ["React Native", "Firebase", "Node.js"],
    collaborators: [{ name: "David Kim", avatar: "/api/placeholder/32/32" }],
    updatedAt: "5 days ago",
    semester: "4th Sem",
    fieldOfStudy: "Cybersecurity",
    technologies: ["React Native", "Firebase", "Node.js"],
  },
];

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

export default function ProjectsPage() {
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
        <ProjectsClient projects={mockProjects} filterOptions={filterOptions} />
      </div>
    </div>
  );
}
