import InputField from "@/components/ui/InputField";

interface ExternalLinksSectionProps {
  formData: {
    website: string;
    orcidId: string;
    googleScholar: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function ExternalLinksSection({
  formData,
  onInputChange,
}: ExternalLinksSectionProps) {
  return (
    <>
      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website
        </label>
        <InputField
          variant="alt"
          type="url"
          value={formData.website}
          onChange={(e) => onInputChange("website", e.target.value)}
          placeholder="https://your-website.com"
        />
      </div>

      {/* ORCID ID */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ORCID ID
        </label>
        <InputField
          variant="alt"
          type="text"
          value={formData.orcidId}
          onChange={(e) => onInputChange("orcidId", e.target.value)}
          placeholder="0000-0000-0000-0000"
        />
      </div>

      {/* Google Scholar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Scholar
        </label>
        <InputField
          variant="alt"
          type="text"
          value={formData.googleScholar}
          onChange={(e) => onInputChange("googleScholar", e.target.value)}
          placeholder="Google Scholar profile URL"
        />
      </div>
    </>
  );
}
