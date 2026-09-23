const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loveKonnectionStory = `### Product Overview and Architecture

LoveKonnection is an event-driven social dating application designed to solve dating app fatigue. Instead of endless digital swiping, the platform connects people through curated offline social gatherings such as wine tastings, speed dating, rooftop mixers, and activity workshops.

The product ecosystem connects three main roles:
- Single Attendees: Browse curated gatherings, reserve tickets, check in at venues, and connect with people they meet.
- Event Organizers: Publish local experiences, scan guest tickets at the door, and monitor room capacity.
- Safety Administrators: Supervise user verification, resolve dispute reports, and ensure community standards.

---

### Step 1: Onboarding and Identity Verification

#### Welcome and Brand Introduction
The welcome screen introduces the core philosophy of LoveKonnection: real chemistry happens in real life. First-time visitors view a brief preview of upcoming community mixers and begin registration with their mobile phone number.

#### Phone Authentication and Access Control
To protect the community from spam accounts and repeat offenders, every member verifies their account using their mobile phone number. A six-digit SMS code confirms their identity immediately. If delivery is delayed, members can request a resend through WhatsApp or a short automated phone call.

#### Biometric Verification and Anti-Catfishing
To ensure the person arriving at an event matches their profile pictures, users complete a quick front-camera verification check. The system analyzes live facial landmarks to confirm authenticity. Approved members receive a verified checkmark on their profile, while uncertain submissions are routed to human reviewers for confirmation within fifteen minutes.

#### Lifestyle and Activity Calibration
Members customize their matchmaking preferences through interactive topic tags. Users choose their dating intentions, favorite weekend activities, and preferred search radius. The application uses this information to suggest relevant upcoming gatherings without subjecting members to tedious questionnaires.

---

### Step 2: Event Discovery and Schedule Exploration

#### The Event Radar Feed
The discovery feed serves as the central hub of the application. Members can browse upcoming gatherings filtered by date, neighborhood, or event style. Each card shows the venue neighborhood, ticket cost, schedule highlights, and a real-time attendance balance meter showing male and female registration ratios so attendees know the crowd will be balanced.

#### Interactive City Map
Users can toggle from the card feed into an interactive map view to discover gatherings happening near their home, workplace, or hotel. Tapping any map pin reveals a preview card with distance and opening hours.

#### Event Dossier and Evening Itinerary
Tapping an event opens a full dossier outlining the exact timeline for the evening. For example, guests see that welcome drinks begin at 7:30 PM, conversation rotations start at 8:15 PM, and open social mingling continues from 9:30 PM onward. This transparency eases social anxiety by letting attendees know exactly what to expect.

---

### Step 3: Ticketing, Digital Passes, and Pre-Event Lounge

#### One-Tap Ticket Reservation
Guests can reserve their spot using Apple Pay, Google Pay, or a credit card in a streamlined checkout flow. When a user begins checkout, their seat is reserved for five minutes to prevent duplicate bookings during high-demand releases.

#### Anti-Fraud Digital Pass
Upon booking, attendees receive a digital entry pass stored directly within the application. The pass features a rolling dynamic QR code that refreshes every thirty seconds alongside an animated watermark, preventing ticket duplication or scalping.

#### The 24-Hour Pre-Event Lounge
Exactly twenty-four hours before the event begins, confirmed ticket holders gain access to an exclusive pre-event lounge. Attendees can answer lighthearted icebreaker polls and see previews of verified members who will be in the room. Direct messaging remains locked until in-person check-in to preserve the excitement of meeting face-to-face first.

---

### Step 4: In-Venue Physical Event Experience

#### Door Check-In
When an attendee arrives at the venue, the event host scans their dynamic QR code using the organizer tablet application. The attendee phone provides a gentle haptic confirmation and immediately switches the screen into Live Event Mode.

#### Live Event Mode and Conversation Prompts
During the gathering, the application acts as an unobtrusive wingman. If a conversation pauses, tapping the conversation prompt button presents thought-provoking questions tailored to both participants based on their shared interests.

#### Discrete Mutual Spark Selection
Throughout the evening, attendees can privately mark their connection with people they met. Users select whether each person was a romantic spark, a friendly connection, or neutral. No one is ever notified of a one-sided choice, eliminating any chance of in-person awkwardness or rejection.

---

### Step 5: Post-Event Connections and Direct Chat

#### The Morning Connection Reveal
At ten o'clock the morning after the event, attendees receive a notification that their connection results are ready. If two people mutually selected each other, a celebratory screen reveals their match along with shared talking points from the night before.

#### Direct Messaging and Date Recommendations
Matched pairs can begin chatting immediately within a safe, dedicated conversation window. The chat interface includes convenient buttons suggesting popular public coffee shops and venues midway between both users to help them easily plan their first individual date.

---

### End-to-End Experience Summary

1. Account Setup: The user downloads the app, verifies their phone number, and completes biometric selfie verification.
2. Preferences: The user chooses their dating intentions, preferred social activities, and distance radius.
3. Event Discovery: The user browses the radar, finds a rooftop mixer, and checks the attendance balance meter.
4. Booking: The user reviews the evening schedule, locks their seat for five minutes, and purchases a ticket.
5. Anticipation: Twenty-four hours prior, the pre-event lounge opens with community polls and attendee previews.
6. Arrival: The host scans the user's dynamic QR ticket at the door, unlocking live event mode.
7. Interaction: The user mingles, uses conversation prompt cards, and privately marks people they enjoyed meeting.
8. Morning Results: At ten in the morning, mutual sparks are revealed with zero awkwardness.
9. First Date: The matched pair chats and schedules their first individual date at a suggested midway cafe.`;

const mauritiusStory = `### Product Overview and Architecture

This is Mauritius is a comprehensive mobile travel and lifestyle application designed to streamline island exploration for international travelers and local residents alike.

---

### Step 1: Contextual Onboarding and Travel Style

#### Traveler Profiling
When opening the application for the first time, users choose between international traveler mode and local resident mode. International visitors receive currency conversion tools and offline navigation prompts, while local residents see weekend cultural festivals and newly opened dining spots.

#### Offline Map Download
The application offers an optional offline map package covering the entire island under forty-five megabytes. This allows travelers to navigate scenic coastal drives and mountain trails without relying on expensive cellular roaming.

---

### Step 2: Island Discovery and Dynamic Feed

#### Category Exploration
Travelers can explore curated categories including secluded beaches, rainforest waterfalls, heritage rum distilleries, and catamaran excursions. Each listing includes verified photos, admission details, and recommended visiting times.

#### Live Weather and Coastal Conditions
An integrated weather strip provides real-time marine and weather conditions across the northern, southern, eastern, and western coasts, helping visitors choose the best beach based on current wind and sunshine.

---

### Step 3: Smart Itinerary Planning and Bookings

#### Algorithmic Route Clustering
Users can add multiple destinations to a custom itinerary. The application automatically clusters activities geographically to minimize travel time along winding coastal roads.

#### Direct Host Communication and Reservations
Listings provide one-tap links to connect with local excursion operators and reserve dining tables directly via WhatsApp or online booking.`;

const memorialStory = `### Product Overview and Architecture

Memorial Moments Magazine is a collaborative mobile publishing application that turns family stories, voice memos, and archival photos into beautifully typeset digital magazines and heirloom print keepsakes.

---

### Step 1: Story Room Creation and Invitations

#### Creating a Family Chronicle
A family organizer creates a dedicated publication room for a milestone anniversary, a tribute, or a family heritage archive. The creator sets privacy permissions and invites relatives through secure invite links.

#### Multi-Generational Contribution
Family members of all ages can contribute through voice recordings, scanned photographs, or written recollections. Audio recordings are automatically transcribed into readable paragraphs, making participation simple for older relatives.

---

### Step 2: Automated Typesetting and Reading Experience

#### Intelligent Layout Engine
The application automatically formats contributed stories and photos into balanced magazine spreads with pull quotes, full-bleed images, and chronological dates, eliminating the need for graphic design expertise.

#### Interactive Digital Reader
Family members can read the completed publication on smartphones or tablets with tactile page-curl animations and tap to hear original voice recordings embedded directly alongside quotes.

---

### Step 3: Heirloom Keepsake Printing

#### Print Pre-Flight Checks
The system inspects vintage photos to ensure high resolution and validates page margins for hardcover bookbinding.

#### Direct Home Delivery
Organizers can order archival hardcover or softcover editions shipped directly to relatives across different cities in a single checkout.`;

async function main() {
  await prisma.project.update({
    where: { slug: "lovekonnection-dating-app" },
    data: { caseStudy: loveKonnectionStory }
  });
  await prisma.project.update({
    where: { slug: "this-is-mauritius-travel-app" },
    data: { caseStudy: mauritiusStory }
  });
  await prisma.project.update({
    where: { slug: "memorial-moments-magazine" },
    data: { caseStudy: memorialStory }
  });
  console.log("Successfully cleaned and polished all case study walkthroughs!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
