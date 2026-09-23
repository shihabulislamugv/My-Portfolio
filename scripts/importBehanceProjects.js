const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const projectsToImport = [
  {
    title: "LoveKonnection — Event-Driven Dating App",
    slug: "lovekonnection-dating-app",
    role: "Lead UX/UI Designer & Design Systems",
    timeline: "3 Months (2025)",
    description: "An event-driven dating app replacing mindless swiping with real-world connections through curated events and verified check-ins.",
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/248261252952097.6a5c5cc013422.png",
    localFileName: "lovekonnection-hero.png",
    externalLink: "https://www.behance.net/gallery/252952097/LoveKonnection-Dating-App-UXUI-Case-Study",
    problem: "Modern dating apps have trapped users in endless loops of swiping fatigue, superficial ghosting, and low conversion to real-world dates. Users spent hours per day matching with people they would never actually meet in person.",
    solution: "LoveKonnection bridges the digital-to-physical gap with an event-centric paradigm. Users discover curated, interest-based social events, RSVP, and connect with other attendees before, during, and after the event. Designed a full 3-role ecosystem: User (mobile), Organizer (mobile & tablet), and Super Admin (web dashboard) across 60+ responsive screens.",
    caseStudy: `## Project Overview
LoveKonnection is an innovative, event-driven dating and social matchmaking application that fundamentally shifts the focus from superficial card swiping to meaningful real-world interactions.

### The 3-Role Ecosystem
1. **End User App (iOS / Android)**: Event discovery, ticket booking, verified profile matching, attendee icebreakers, and in-venue digital check-ins.
2. **Organizer Suite**: Event creation, attendee approval pipelines, QR ticket validation, and post-event match engagement analytics.
3. **Admin Web Console**: Content moderation, dispute handling, payout disbursements, and safety verification audits.

### Design System & Craft
- Custom dark-mode centric design system with romantic neon accents.
- High-contrast accessibility standards (WCAG AAA).
- Fluid micro-interactions for event discovery, RSVPing, and real-time messaging.`
  },
  {
    title: "This is Mauritius — Travel & Lifestyle App",
    slug: "this-is-mauritius-travel-app",
    role: "Product Designer (Mobile & UX Research)",
    timeline: "2 Months (2024)",
    description: "A seamless mobile travel and lifestyle platform helping international tourists and locals discover curated venues, activities, and hidden island gems.",
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/25e96d239553571.692c298a4a299.png",
    localFileName: "mauritius-travel-hero.png",
    externalLink: "https://www.behance.net/gallery/239553571/This-is-Mauritius-Travel-App-UXUI-Case-Study",
    problem: "Tourists visiting Mauritius struggled to find authentic local activities beyond traditional resort confines. Information was fragmented across outdated blogs, slow hotel brochures, and scattered tour operators.",
    solution: "Created an all-in-one destination companion app featuring curated category filters (beaches, waterfalls, restaurants, nightspots, cultural tours), offline interactive maps, personalized itinerary generators, and frictionless direct booking.",
    caseStudy: `## Project Vision
'This is Mauritius' was designed as the definitive digital concierge for exploring the island nation of Mauritius.

### Key Features
- **Curated Exploration Engine**: Dynamic visual feeds highlighting pristine beaches, heritage landmarks, and water sports.
- **Smart Itinerary Builder**: Algorithmic itinerary planner that clusters activities geographically to minimize travel time across the island.
- **Offline Maps & Navigation**: Low-bandwidth offline mode designed for international travelers without local SIM roaming.
- **Direct Venue Reservations**: One-tap table bookings and excursion reservations directly from partner profiles.`
  },
  {
    title: "Memorial Moments Magazine — Storytelling App",
    slug: "memorial-moments-magazine",
    role: "Senior UI/UX Designer",
    timeline: "6 Weeks (2024)",
    description: "An emotional storytelling and digital magazine mobile application crafted to preserve, cherish, and celebrate legacy family memories and life milestones.",
    imageUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dad303235791995.68de6b96642d3.png",
    localFileName: "memorial-moments-hero.png",
    externalLink: "https://www.behance.net/gallery/235791995/Memorial-Moments-Magazine-A-Story-Telling-App",
    problem: "Valuable family histories, memoirs, and life milestone photos are often buried in scattered chat threads and disorganized cloud drives, losing their emotional narrative over time.",
    solution: "Developed an editorial magazine format for mobile devices. Families collaboratively compile photos, voice memos, and written reflections into beautifully typeset, printable, and shareable digital magazines that honor cherished memories forever.",
    caseStudy: `## Narrative & Aesthetic
Memorial Moments Magazine emphasizes dignified, timeless editorial aesthetics inspired by print typography and heritage book design.

### Core User Experiences
- **Collaborative Story Chapters**: Relatives invite family members to contribute personal stories, voice clips, and archival photos.
- **Automatic Typesetting**: Intelligent layout engine that balances portrait photos with typography, quotes, and chronological date stamps.
- **Keepsake Print-on-Demand**: Integrated pipeline allowing families to order hardcover physical copies of their digital memorial magazines.`
  }
];

async function downloadImage(url, destPath) {
  console.log(`Downloading ${url} -> ${destPath}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`Failed to download image: ${res.statusText}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  console.log(`Saved ${destPath} (${Math.round(arrayBuffer.byteLength / 1024)} KB)`);
}

async function main() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  for (const item of projectsToImport) {
    const localFilePath = path.join(uploadsDir, item.localFileName);
    try {
      await downloadImage(item.imageUrl, localFilePath);
      item.savedThumbnail = `/uploads/${item.localFileName}`;
    } catch (err) {
      console.warn(`Could not download image locally, using original URL:`, err.message);
      item.savedThumbnail = item.imageUrl;
    }

    const project = await prisma.project.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        description: item.description,
        thumbnail: item.savedThumbnail,
        role: item.role,
        timeline: item.timeline,
        problem: item.problem,
        solution: item.solution,
        externalLink: item.externalLink,
        caseStudy: item.caseStudy,
        published: true,
      },
      create: {
        title: item.title,
        slug: item.slug,
        description: item.description,
        thumbnail: item.savedThumbnail,
        role: item.role,
        timeline: item.timeline,
        problem: item.problem,
        solution: item.solution,
        externalLink: item.externalLink,
        caseStudy: item.caseStudy,
        published: true,
      }
    });

    console.log(`Successfully synced project: ${project.title} (${project.id})`);
  }

  console.log('All 3 Behance case studies successfully imported!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
