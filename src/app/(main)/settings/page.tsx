import ProfileForm from "@/components/settings/ProfileForm";

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}
