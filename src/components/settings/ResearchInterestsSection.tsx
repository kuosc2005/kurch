"use client";

import InputField from "../ui/InputField";

interface ResearchInterestsSectionProps {
  interests: string[];
  newInterest: string;
  onNewInterestChange: (value: string) => void;
  onAddInterest: () => void;
  onRemoveInterest: (interest: string) => void;
}

export default function ResearchInterestsSection({
  interests,
  newInterest,
  onNewInterestChange,
  onAddInterest,
  onRemoveInterest,
}: ResearchInterestsSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Research Interests
      </label>
      <div className="flex flex-wrap gap-2 mb-4">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-teal-50 text-teal-700 border border-teal-200"
          >
            {interest}
            <button
              onClick={() => onRemoveInterest(interest)}
              className="ml-2 text-teal-500 hover:text-teal-700 font-medium"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <InputField
          variant="alt"
          type="text"
          value={newInterest}
          onChange={(e) => onNewInterestChange(e.target.value)}
          placeholder="Add a research interest"
          className=""
          onKeyPress={(e) => e.key === "Enter" && onAddInterest()}
        />
        <button
          onClick={onAddInterest}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );
}
