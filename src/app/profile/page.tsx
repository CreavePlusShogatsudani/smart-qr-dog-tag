import { getProfile } from "@/app/actions/profile";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const userProfile = await getProfile();

    if (!userProfile) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen px-4 pt-6 pb-28" style={{ background: '#fdf8f8' }}>
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="ri-user-line text-teal-500"></i>
                    プロフィール・情報編集
                </h1>

                <ProfileClient initialData={userProfile} />

            </div>
        </div>
    );
}
