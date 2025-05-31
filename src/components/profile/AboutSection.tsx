import { HiLocationMarker, HiMail } from "react-icons/hi";

interface AboutSectionProps {
  university: string;
  location: string;
  education: string;
  email: string;
  researchInterests: string[];
  bio: string;
}

export function AboutSection({
  university,
  location,
  education,
  email,
  researchInterests,
  bio,
}: AboutSectionProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">About</h3>

      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="w-4 h-4 bg-gray-300 rounded flex-shrink-0"></div>
          <span className="text-sm">{university}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <HiLocationMarker size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-start space-x-3 text-gray-600">
          <div className="w-4 h-4 bg-gray-300 rounded mt-1 flex-shrink-0"></div>
          <span className="text-sm">{education}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <HiMail size={16} className="text-gray-400 flex-shrink-0" />
          <span className="text-sm break-all">{email}</span>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">RESEARCH INTERESTS</h4>
        <div className="flex flex-wrap gap-2">
          {researchInterests.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-sm font-medium border border-teal-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold text-gray-800 mb-4">BIO</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
      </div>

      {/* <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="small">
          <HiUsers size={16} />
          <span>Follow</span>
        </Button>
        <Button variant="small">
          <span>Message</span>
        </Button>
      </div> */}
    </div>
  );
}
