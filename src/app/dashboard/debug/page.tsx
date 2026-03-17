import { getProfile } from "@/app/actions/profile";

export default async function DebugPage() {
  const profile = await getProfile();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Profile Data</h1>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[80vh]">
        {JSON.stringify(profile, null, 2)}
      </pre>
    </div>
  );
}
