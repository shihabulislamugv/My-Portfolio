const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.academic.count();
  if (count === 0) {
    const item = await prisma.academic.create({
      data: {
        degree: "B.Sc. in Computer Science & Engineering",
        institution: "Daffodil International University",
        period: "2019 - 2023",
        description: "Specialized in Human-Computer Interaction (HCI), Interface Architecture, and Software Engineering. Active lead in design & product workshops.",
        order: 1,
      },
    });
    console.log("Created academic record:", item);
  } else {
    console.log("Existing records count:", count);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
