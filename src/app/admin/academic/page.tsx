import { prisma } from "@/lib/prisma";
import AcademicManager from "./AcademicManager";

export default async function AcademicPage() {
  const academics = await prisma.academic.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Academic Background</h1>
      <AcademicManager initialAcademics={academics} />
    </div>
  );
}
