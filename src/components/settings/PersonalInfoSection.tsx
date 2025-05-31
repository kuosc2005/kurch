import InputField from "@/components/ui/InputField";

interface PersonalInfoSectionProps {
  formData: {
    title: string;
    department: string;
    bio: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function PersonalInfoSection({
  formData,
  onInputChange,
}: PersonalInfoSectionProps) {
  return (
    <>
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <InputField
          type="text"
          variant="alt"
          value={formData.title}
          onChange={(e) => onInputChange("title", e.target.value)}
        />
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department
        </label>
        <select
          value={formData.department}
          onChange={(e) => onInputChange("department", e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
        >
          <option value="Department of Environmental Science">
            Department of Environmental Science
          </option>
          <option value="Department of Computer Science">
            Department of Computer Science
          </option>
          <option value="Department of Mathematics">
            Department of Mathematics
          </option>
          <option value="Department of Physics">Department of Physics</option>
        </select>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => onInputChange("bio", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-[5px] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
        />
      </div>
    </>
  );
}
