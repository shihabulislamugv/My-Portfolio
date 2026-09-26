const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'initial-data.json');
  if (!fs.existsSync(dataPath)) {
    console.log('No initial-data.json found. Skipping seed.');
    return;
  }

  const { users, profiles, projects, experiences, academics, skills } = JSON.parse(
    fs.readFileSync(dataPath, 'utf8')
  );

  // 1. Seed Users
  if (Array.isArray(users)) {
    for (const u of users) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: { password: u.password },
        create: {
          id: u.id,
          email: u.email,
          password: u.password,
        },
      });
    }
    console.log(`Seeded ${users.length} users.`);
  }

  // 2. Seed Profile
  if (Array.isArray(profiles) && profiles.length > 0) {
    const p = profiles[0];
    await prisma.profile.upsert({
      where: { id: "1" },
      update: {},
      create: {
        id: "1",
        name: p.name || "SHIHAB.",
        headlineLine1: p.headlineLine1 || "Digital",
        headlineLine2: p.headlineLine2 || "experiences",
        shortBio: p.shortBio || "",
        email: p.email || "hello@example.com",
        aboutText: p.aboutText || "",
        resumeUrl: p.resumeUrl || null,
      },
    });
    console.log('Seeded profile.');
  }

  // 3. Seed Projects
  if (Array.isArray(projects)) {
    for (const pr of projects) {
      await prisma.project.upsert({
        where: { slug: pr.slug },
        update: {},
        create: {
          id: pr.id,
          title: pr.title,
          slug: pr.slug,
          description: pr.description,
          thumbnail: pr.thumbnail,
          role: pr.role,
          timeline: pr.timeline,
          problem: pr.problem,
          solution: pr.solution,
          externalLink: pr.externalLink,
          caseStudy: pr.caseStudy,
          published: Boolean(pr.published),
        },
      });
    }
    console.log(`Seeded ${projects.length} projects.`);
  }

  // 4. Seed Experience
  if (Array.isArray(experiences)) {
    const existing = await prisma.experience.count();
    if (existing === 0) {
      for (const e of experiences) {
        await prisma.experience.create({
          data: {
            id: e.id,
            role: e.role,
            company: e.company,
            period: e.period,
            description: e.description,
            order: e.order || 0,
          },
        });
      }
      console.log(`Seeded ${experiences.length} experience entries.`);
    }
  }

  // 5. Seed Academic
  if (Array.isArray(academics)) {
    const existing = await prisma.academic.count();
    if (existing === 0) {
      for (const a of academics) {
        await prisma.academic.create({
          data: {
            id: a.id,
            degree: a.degree,
            institution: a.institution,
            period: a.period,
            description: a.description,
            order: a.order || 0,
          },
        });
      }
      console.log(`Seeded ${academics.length} academic entries.`);
    }
  }

  // 6. Seed Skills
  if (Array.isArray(skills)) {
    const existing = await prisma.skill.count();
    if (existing === 0) {
      for (const s of skills) {
        await prisma.skill.create({
          data: {
            id: s.id,
            name: s.name,
            order: s.order || 0,
          },
        });
      }
      console.log(`Seeded ${skills.length} skills.`);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
  });
