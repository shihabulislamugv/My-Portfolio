import { prisma } from "@/lib/prisma";
import ExperienceManager from "./ExperienceManager";

export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Experience</h1>
      <ExperienceManager initialExperiences={experiences} />
    </div>
  );
}

