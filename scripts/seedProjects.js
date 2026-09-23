const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const projects = [
    {
      title: "FinTech App Redesign",
      slug: "fintech-app-redesign",
      description: "A complete overhaul of a legacy financial tracking application, focusing on user engagement and accessibility.",
      thumbnail: "https://images.unsplash.com/photo-1616077168079-7e09a6a71550?q=80&w=2000&auto=format&fit=crop",
      role: "Lead UX/UI Designer",
      timeline: "Jan 2024 - Mar 2024",
      problem: "The original app had a 40% drop-off rate during onboarding. Users found the interface cluttered and the terminology confusing.",
      solution: "Implemented a conversational onboarding flow, simplified data visualization using clean charts, and introduced a comprehensive design system.",
      externalLink: "https://dribbble.com",
      published: true,
      caseStudy: "## Research\nWe conducted 15 user interviews...\n\n## Wireframes\nLow fidelity sketches focused on the core user journey...\n\n## Final Design\nThe new interface uses a calming blue palette..."
    },
    {
      title: "E-Commerce Dashboard",
      slug: "ecommerce-dashboard",
      description: "Admin panel design for boutique shop owners to manage inventory, sales, and customer relations.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
      role: "Product Designer",
      timeline: "Jun 2023 - Sep 2023",
      problem: "Shop owners were using 3 different tools to manage their business, causing errors in stock tracking.",
      solution: "A unified dashboard that integrates inventory, analytics, and CRM into one seamless experience.",
      externalLink: "https://behance.net",
      published: true,
      caseStudy: "## Context\nShop owners need efficiency...\n\n## Prototyping\nCreated interactive prototypes in Figma..."
    }
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  
  console.log("Projects seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
