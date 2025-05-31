import { Publication } from "../../types/profile";

import { PublicationCard } from "./PublicationCard";

interface PublicationsSectionProps {
  publications: Publication[];
  children: React.ReactNode;
}

export function PublicationsSection({
  publications,
  children,
}: PublicationsSectionProps) {
  return (
    <div className="rounded-xl">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Publications</h2>
          <div className="flex flex-col sm:flex-row gap-3">{children}</div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6">
          {publications.map((pub, index) => (
            <PublicationCard key={index} publication={pub} />
          ))}
        </div>
      </div>
    </div>
  );
}
