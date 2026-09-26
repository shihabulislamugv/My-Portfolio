import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PasswordChangeForm } from "../components/PasswordChangeForm";

export default async function AdminSecurityPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
          Account Security
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest mt-2 text-sm">
          Manage administrator credentials &amp; authentication settings
        </p>
      </div>

      <PasswordChangeForm />
    </div>
  );
}
