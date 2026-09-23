import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <ProfileForm initialData={profile || {}} />
    </div>
  );
}

