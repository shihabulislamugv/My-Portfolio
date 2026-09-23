import { prisma } from "@/lib/prisma";
import SkillManager from "./SkillManager";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>
      <SkillManager initialSkills={skills} />
    </div>
  );
}

