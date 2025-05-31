import { HiUsers, HiExternalLink } from "react-icons/hi";
import { Publication } from "../../types/profile";

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-gray-800 mb-3 hover:text-teal-600 cursor-pointer transition-colors">
        {publication.title}
      </h3>
      <div className="text-sm text-gray-600 mb-4">
        <span className="font-medium">{publication.journal}</span> •{" "}
        {publication.volume} • {publication.date}
      </div>
      <p className="text-gray-700 text-sm mb-5 leading-relaxed">
        {publication.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {publication.tags.map((tag, tagIndex) => (
          <span
            key={tagIndex}
            className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>📄</span>
            <span>Citations: {publication.citations}</span>
          </div>
          <div className="flex items-center space-x-2">
            <HiUsers size={14} />
            <span className="line-clamp-1">
              Co-authors: {publication.authors}
            </span>
          </div>
        </div>
        <button className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-2 transition-colors self-start lg:self-center">
          <span>View full publication</span>
          <HiExternalLink size={14} />
        </button>
      </div>
    </div>
  );
}
