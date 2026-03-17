import { getProfile } from "@/app/actions/profile";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return <DashboardClient initialProfile={profile} />;
}
