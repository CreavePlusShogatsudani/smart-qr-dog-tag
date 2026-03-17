import { getProfile } from "@/app/actions/profile";
import { prisma } from "@/lib/prisma";

export default async function DebugPage() {
  const profile = await getProfile();
  const allTags = await prisma.tag.findMany();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Profile Data</h1>
      <h2 className="text-xl font-bold mt-6 mb-2">My Profile (with Pets & Tags)</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[40vh] mb-8">
        {JSON.stringify(profile, null, 2)}
      </pre>

      <h2 className="text-xl font-bold mt-6 mb-2">All Tags in DB</h2>
      <pre className="bg-blue-50 p-4 rounded-lg overflow-auto max-h-[40vh]">
        {JSON.stringify(allTags, null, 2)}
      </pre>
    </div>
  );
}
