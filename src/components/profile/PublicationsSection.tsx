import { HiFilter, HiPlus } from "react-icons/hi";
import { Publication } from "../../types/profile";
import Button from "@/components/ui/button";
import { PublicationCard } from "./PublicationCard";

interface PublicationsSectionProps {
  publications: Publication[];
}

export function PublicationsSection({
  publications,
}: PublicationsSectionProps) {
  return (
    <div className="rounded-xl">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Publications</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="small">
              <HiFilter size={16} />
              <span>Filter</span>
            </Button>
            <Button variant="small">
              <HiPlus size={16} />
              <span>Add Publication</span>
            </Button>
          </div>
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
