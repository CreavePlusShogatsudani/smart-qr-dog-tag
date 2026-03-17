import { prisma } from "@/lib/prisma";

export default async function RepairPage() {
  const currentPetId = "cmmuafi67000004jr6cljpu9w";
  const tagHash = "eb1bf435-5212-4bf8-b2a9-c8b90b951a2d";

  let result = "";
  try {
    const updatedTag = await prisma.tag.update({
      where: { tag_hash: tagHash },
      data: { pet_id: currentPetId }
    });
    result = `Success! Tag ${tagHash} linked to Pet ${currentPetId}.`;
  } catch (err: any) {
    result = `Error: ${err.message}`;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Repair Result</h1>
      <p className="bg-green-100 p-4 rounded-lg">{result}</p>
      <a href="/dashboard" className="text-blue-500 underline mt-4 block text-lg">Go to Dashboard</a>
    </div>
  );
}
