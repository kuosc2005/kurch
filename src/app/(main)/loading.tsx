export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200"></div>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>
  );
}
