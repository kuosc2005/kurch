import { HiShare, HiPencil } from "react-icons/hi";
import { Button } from "@/components/ui/RadixButton";
import Link from "next/link";

interface ProfileHeaderProps {
  name: string;
  title: string;
  department: string;
  isCurrentUser: boolean;
}

export function ProfileHeader({
  name,
  title,
  department,
  isCurrentUser = false,
}: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-teal-700 to-teal-600 rounded-xl p-6 sm:p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-10"></div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center space-y-4 lg:space-x-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full"></div>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {name}
            </h1>
            <p className="text-teal-100 text-sm sm:text-base">
              {title},{department}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-50/30 text-gray-100"
          >
            <HiShare size={16} />
            <span className="hidden sm:inline">Share</span>
          </Button>
          {isCurrentUser && (
            <Link href="/settings">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white text-primary"
              >
                <HiPencil size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
