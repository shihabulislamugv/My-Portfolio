const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cleanLoveKonnection = `### Executive Summary & System Architecture
LoveKonnection is an event-driven social dating ecosystem built to eliminate the burnout of superficial card swiping by anchoring human romance around curated, real-world social gatherings.

The product architecture unites three interdependent personas into a single coherent engine:
- The Dating User (Mobile App): Seeking genuine, pressure-free connections at vetted venues.
- The Event Organizer (Mobile & Tablet): Curating experiences, validating attendees, and managing venue capacity.
- The Trust & Safety Admin (Web Console): Moderating content, reviewing identity verifications, and overseeing platform safety.

---

### Phase 1: Onboarding, Identity Trust & Profile Calibration

#### Screen 1.1: Splash & Value Proposition Gateway
- Purpose: Establishes emotional safety, core brand promise (Real Connections at Curated Events), and sets expectations that this is an offline-first dating platform.
- Interactions: Single primary action button (Get Started with Mobile) and secondary sign-in option.
- Next Step: Transitions smoothly into phone authentication via one-time SMS verification.

#### Screen 1.2: Phone Authentication & OTP Verification
- Purpose: Prevents bot registrations, burner accounts, and impersonation.
- Interactions: Country code auto-detection, phone input with numerical formatting, and an automatic 6-digit SMS listener.
- Validations & Edge Cases: Rate limits requests to 3 attempts every 10 minutes. A 60-second countdown timer runs before offering an option to resend the code via WhatsApp or voice call.
- Next Step: If a new user, routes directly to identity verification; if a returning user, authenticates directly to the event discovery feed.

#### Screen 1.3: Biometric Selfie & Liveness Verification
- Purpose: Eradicates catfishing before users ever enter the event ecosystem.
- Interactions: Interactive front-camera prompt asking the user to turn their head left and right and smile to verify liveness.
- System Logic: Compares live facial landmarks against uploaded profile pictures.
- States: Approved accounts receive a verified identity badge and unlock ticket booking. If lighting is poor, guided tips help the user retake the photo. Flagged attempts route to the admin console for human review.

#### Screen 1.4: Personality, Dating Intentions & Preference Calibration
- Purpose: Gathers matchmaking telemetry without exhausting the user with lengthy forms.
- Interactions: Interactive selection pills across dating goals (long-term relationship, casual dating, or expanding social circle), activity preferences (wine tasting, indie concerts, board games, rooftop mixers), and distance radius.
- Next Step: Generates personalized algorithmic recommendations and transitions to the main home radar.

---

### Phase 2: Event Discovery & Community Matching

#### Screen 2.1: The Event Radar & Dynamic Feed (Core Screen)
- Purpose: Primary discovery hub where users find upcoming events matching their schedule and vibe.
- Information Displayed: Event title, venue badge, date and time countdown, and a live demographic balance meter showing male and female registration ratios so attendees know the room will be balanced.
- Interactions & Transitions: Users can toggle between a card list view and an interactive map showing venue locations across the city. Tapping any card opens the complete event dossier.

#### Screen 2.2: Event Detail Dossier & Schedule Breakdown
- Purpose: Provides complete transparency on what will happen, who will be there, and what the dress code and house rules are.
- Information Displayed: High-resolution venue photos, host biography, evening timeline breakdown (7:30 PM welcome drinks, 8:15 PM icebreaker rotations, 9:30 PM open mixer), ticket tiers, and safety policies.
- Actions Available: Save to favorites, share an invitation link, or reserve a seat.

---

### Phase 3: Frictionless Ticketing & Pre-Event Lounge

#### Screen 3.1: Checkout & Instant RSVP Confirmation
- Purpose: Friction-free transaction flow with zero hidden platform fees.
- Interactions: Native Apple Pay, Google Pay, or credit card checkout. A 5-minute seat reservation lock prevents overbooking during payment.
- Post-Action State: Instant confirmation screen with calendar export shortcuts (Apple and Google Calendar) and an SMS receipt.

#### Screen 3.2: Dynamic Watermarked Digital Pass
- Purpose: Fraud-proof admission ticket for venue entry.
- Features: Rotating animated QR code that refreshes every 30 seconds to prevent screenshots or scalping, accompanied by an integrated maps link for turn-by-turn directions.

#### Screen 3.3: The 24-Hour Pre-Event Icebreaker Lounge
- Purpose: Decreases no-show rates and diffuses social anxiety before attendees leave their homes.
- Mechanism: Unlocks exactly 24 hours prior to the event exclusively for confirmed ticket holders.
- Interactions: Daily community icebreaker polls and a browsable directory of verified attendees. One-on-one direct messaging remains locked until in-person check-in to preserve the magic of meeting face-to-face first.

---

### Phase 4: In-Venue Physical Event Experience

#### Screen 4.1: Door Check-In & Handshake
- Purpose: Transitions the digital ticket to an active in-venue state.
- Flow: The host scans the attendee's dynamic QR code using the organizer app, triggering a gentle haptic vibration that switches the user's interface into Live Event Mode.

#### Screen 4.2: Live Event Mode (In-Venue Wingman)
- Purpose: Supports real-world conversation without keeping eyes glued to screens.
- Features: A conversation spark button offering shared-interest icebreakers, and a discrete tagging tool where attendees privately mark people as Spark (romantic interest), Friend (platonic connection), or Pass (neutral).
- Crucial UX Rule: No user is ever notified if someone passed or did not select them. Connections are only revealed if the interest is mutual.

---

### Phase 5: Post-Event Matching & Safe Communication

#### Screen 5.1: The Mutual Spark Reveal (Morning After at 10:00 AM)
- Purpose: Creates an exciting morning-after ritual while eliminating in-person awkwardness or fear of rejection.
- Mechanism: At 10:00 AM the morning following the event, attendees receive a notification that their results are ready.
- Reveal Screen: Mutual matches celebrate with shared conversation highlights and an instant chat button. If there are no mutual matches, encouraging feedback reminds the user of upcoming weekend gatherings.

#### Screen 5.2: 1-on-1 Direct Messaging Channel
- Purpose: Facilitates arranging a second, private date.
- Features & Guardrails: Contextual suggestions recommending safe, vetted public cafes midway between both users, backed by automated content safety filters and one-tap report controls.

---

### Phase 6: Organizer & Super Admin Operations

#### Screen 6.1: Organizer Door Scanner (Mobile & Tablet)
- Purpose: Sub-second guest check-in at the entrance.
- Information Displayed: Attendee name, photo verification thumbnail, ticket tier, and dietary notes, alongside a live gauge tracking room capacity and gender ratios.

#### Screen 6.2: Trust & Safety Admin Console (Web)
- Purpose: Platform governance, dispute resolution, and security oversight.
- Capabilities: Identity verification queue, incident report tracking, and hardware-level device banning to permanently exclude bad actors.

---

### Complete End-to-End User Flow

1. Onboarding: User installs the app, authenticates via phone OTP, and completes biometric selfie verification.
2. Preferences: User sets dating intentions, activity interests, and geographic search radius.
3. Discovery: User browses the Event Radar, selects a rooftop mixer, and checks the balanced attendance meter.
4. Ticketing: User reviews the evening schedule, locks their seat for 5 minutes, and pays with one tap via Apple Pay.
5. Pre-Event: 24 hours prior, the Icebreaker Lounge opens for polls and attendee previews.
6. Check-in: Host scans the user's dynamic rolling QR pass, activating Live Event Mode.
7. Event Interaction: User mingles, uses conversation prompt cards, and privately marks Spark on profiles of people they enjoyed meeting.
8. Morning Results: At 10:00 AM the next day, a mutual spark notification appears.
9. Next Date: User opens the direct chat, selects a suggested midway coffee spot, and schedules their first private date.`;

async function main() {
  await prisma.project.update({
    where: { slug: "lovekonnection-dating-app" },
    data: { caseStudy: cleanLoveKonnection }
  });
  console.log("Updated LoveKonnection case study with clean normal text!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
