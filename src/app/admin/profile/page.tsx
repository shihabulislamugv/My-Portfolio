import { prisma } from "@/lib/prisma";
import ProfileForm from "./ProfileForm";
import { PasswordChangeForm } from "../components/PasswordChangeForm";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div className="max-w-4xl p-6 sm:p-10 space-y-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900">
          Profile Settings
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest mt-1 text-xs">
          Manage your personal details, portfolio copy &amp; downloadable PDF resume
        </p>
      </div>

      <ProfileForm initialData={profile || {}} />

      <div className="pt-6">
        <PasswordChangeForm />
      </div>
    </div>
  );
}
