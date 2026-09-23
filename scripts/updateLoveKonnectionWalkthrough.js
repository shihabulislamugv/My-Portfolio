const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const detailedWalkthrough = `### Executive Summary & System Architecture
LoveKonnection is an event-driven social dating ecosystem built to eliminate the burnout of superficial card swiping by anchoring human romance around curated, real-world social gatherings. 

The product architecture unites three interdependent personas into a single coherent engine:
1. **The Dating User (Mobile)**: Seeking genuine, pressure-free connections at vetted venues.
2. **The Event Organizer (Mobile & Tablet)**: Curating experiences, validating attendees, and managing venue capacity.
3. **The Trust & Safety Admin (Web Console)**: Moderating content, reviewing identity verifications, and overseeing platform safety.

---

### Phase 1: Onboarding, Identity Trust & Profile Calibration

#### 1.1 Splash & Value Proposition Gateway
- **Purpose**: Establishes emotional safety, core brand promise ("Real Connections at Curated Events"), and sets expectations that this is an offline-first dating platform.
- **Interactions**: Single primary CTA ("Get Started with Mobile") and secondary ("Log In").
- **Next Step**: Transitions into phone authentication via OTP.

#### 1.2 Phone Authentication & Two-Factor OTP Verification
- **Purpose**: Prevents bot registrations, burner accounts, and impersonation.
- **Interactions**: Country code auto-detection, phone input with numerical masking, automatic 6-digit SMS OTP listener.
- **Validations & Edge Cases**: 
  - Rate limiting (maximum 3 OTP requests in 10 minutes).
  - Timeout countdown with "Resend via WhatsApp or Call" fallback.
- **Next Step**: If new user, routes to Identity Verification; if returning, authenticates directly to Event Discovery.

#### 1.3 Biometric Selfie & Liveness Verification
- **Purpose**: Eradicates catfishing before users ever enter the ecosystem.
- **Interactions**: Interactive front-camera prompt asking user to turn head left/right and smile to generate a secure biometric hash.
- **System Logic**: Compares live facial landmarks against uploaded profile pictures.
- **States**: 
  - *Pending Verification*: User can browse events in read-only preview mode.
  - *Approved*: Unlocks RSVP capabilities and gives the profile a blue "Verified Identity" shield.
  - *Failed / Review*: Flags to the Admin Web Console for manual operator review within 15 minutes.

#### 1.4 Personality, Dating Intentions & Preference Calibration
- **Purpose**: Gathers matchmaking telemetry without exhausting the user.
- **Interactions**: Interactive pill selection across 3 dimensions:
  1. *Intentions*: Long-term partnership, Casual dating, Social mixer/New friends.
  2. *Interest Tags*: Wine & Gastronomy, Indie Concerts, Board Games, Hiking, Rooftop Lounges.
  3. *Age & Geography Radius*: Slider with dynamic real-time count of active upcoming events.
- **Next Step**: Generates personalized algorithmic event recommendations and transitions to the Main Home Radar.

---

### Phase 2: Event Discovery & Community Matching

#### 2.1 The Event Radar & Dynamic Feed (Core Screen)
- **Purpose**: Primary discovery hub where users find upcoming events matching their schedule and vibe.
- **Information Displayed**:
  - Event title, venue badge, date/time countdown ("Tonight at 8:00 PM").
  - Live demographic balance indicator: A live ratio meter showing balanced male/female/non-binary registrations (e.g., "52% W / 48% M — Balanced").
  - "Attendees Like You": Mini avatar ring showing verified attendee archetypes without compromising full privacy.
- **Interactions & Transitions**:
  - Horizontal swipe through featured highlight banners.
  - Toggle between **List View** and **Interactive Map View** (visualizing venue clusters across the city).
  - Tapping an event card triggers a shared-element transition expanding into the Event Detail Dossier.

#### 2.2 Event Detail Dossier & Attendee Vibe Check
- **Purpose**: Provides complete transparency on what will happen, who will be there, and what the dress code/rules are.
- **Information Displayed**:
  - Venue photos, host bio, structured schedule (e.g., 7:30 PM Welcome Drink → 8:15 PM Icebreaker Rotation → 9:30 PM Open Mixer).
  - Ticket tier availability (Early Bird, General Admission, VIP Host Table).
  - Safety & code of conduct commitments.
- **Actions Available**:
  - Bookmark / Add to Wishlist.
  - Share with friends (creates deep link).
  - Primary Action: "Reserve Seat / Buy Ticket".

---

### Phase 3: Frictionless Ticketing & Pre-Event Lounge

#### 3.1 Checkout & Instant RSVP Confirmation
- **Purpose**: Friction-free transaction flow with zero hidden service fees.
- **Interactions**: Native Apple Pay / Google Pay sheet or Credit Card input with instant validation.
- **Validations**: Real-time seat reservation lock (reserves ticket for 5 minutes during checkout to avoid overbooking).
- **Post-Action State**: Instant confirmation modal with dynamic confetti animation, automatic iOS Calendar / Google Calendar export, and SMS reminder confirmation.

#### 3.2 Dynamic Watermarked Digital Pass
- **Purpose**: Fraud-proof admission ticket for venue entry.
- **Features**:
  - Rotating animated QR code (changes every 30 seconds to prevent screenshots/scalping).
  - Live venue countdown clock.
  - "Directions to Venue" button integrating directly with Google Maps / Apple Maps.

#### 3.3 The 24-Hour Pre-Event Icebreaker Lounge
- **Purpose**: Decreases no-show rates and diffuses social anxiety before attendees leave their homes.
- **Mechanism**: Exactly 24 hours prior to event kick-off, registered ticket holders unlock a temporary group lounge.
- **Interactions**:
  - Anonymous trivia questions and icebreaker polls ("What's your go-to weekend cocktail?").
  - Profiles of confirmed attendees become browsable in a discrete "Who's In the Room" catalog.
  - Direct messaging remains locked until after in-person check-in to preserve the magic of meeting face-to-face first.

---

### Phase 4: In-Venue Physical Event Experience

#### 4.1 Door Check-In & Handshake
- **Purpose**: Transitions digital ticket to an active "In-Venue" state.
- **Flow**: Organizer scans attendee's dynamic QR code using the Organizer Door App. 
- **System Action**: Immediately updates user app state from "Upcoming Ticket" to "Live Event Mode".

#### 4.2 Live Event Mode ("In-Venue Beacon")
- **Purpose**: In-venue digital wingman that facilitates organic conversation without keeping eyes glued to screens.
- **Features & Screens**:
  - **Icebreaker Prompt Cards**: When conversation stalls, tapping "Conversation Spark" presents tailored, thought-provoking questions tailored to both participants' shared interests.
  - **Discrete Spark Tagging**: Allows attendees to privately mark people they enjoyed speaking with without any awkwardness. Options:
    - *Spark* (Romantic Interest)
    - *Friend* (Platonic Connection)
    - *Pass* (No connection)
  - Crucial UX Rule: No one ever knows who marked them unless there is a mutual Spark.

---

### Phase 5: Post-Event Matching & Safe Communication

#### 5.1 The Mutual Spark Reveal (Next Morning at 10:00 AM)
- **Purpose**: Creates an exciting morning-after ritual and eliminates real-time rejection anxiety.
- **Mechanism**: At 10:00 AM the morning after the event, users receive a discreet push notification: "Your Event Connections Are In".
- **Reveal Screen**: 
  - If mutual Spark: Celebratory burst showing both profiles with conversation starters drawn from their in-person discussion tags.
  - If unilateral Spark: Graceful encouragement reminding user of upcoming weekend mixers with zero negative reinforcement.

#### 5.2 1-on-1 Direct Messaging Channel
- **Purpose**: Facilitates arranging a second, private date.
- **Features & Guardrails**:
  - Verified phone & identity badge visible in chat header.
  - Safe Meetup Suggestions: Contextual pill prompts suggesting safe, vetted public cafes and venues midway between both users.
  - Anti-Harassment AI Engine: Proactively flags unsolicited explicit language or aggressive behavior with one-tap report/block.

---

### Phase 6: Organizer & Super Admin Operations

#### 6.1 Organizer Door Scanner & Capacity Tracker
- **Device**: Mobile / iPad at venue entrance.
- **Functionality**: Sub-second camera QR scanner displaying attendee name, photo, and ticket tier.
- **Real-Time Analytics**: Visual gauge displaying current door count vs. venue fire code capacity and real-time demographic balance.

#### 6.2 Trust & Safety Admin Console (Web)
- **Queue**: Real-time moderation feed of flagged profiles, user reports, and selfie identity discrepancies.
- **Action Suite**: Temporary suspension, permanent device-level ban (IMEI / hardware ID lock), and ticket refund issuance.

---

### Complete End-to-End User Flow Summary

1. **Discovery**: User opens LoveKonnection → sees "Rooftop Sunset Singles Mixer (Friday, 8 PM)" with balanced gender ratio.
2. **Booking**: Taps event → reviews schedule and vibe → buys ticket in 2 taps via Apple Pay.
3. **Warmup**: 24 hours prior → Icebreaker Lounge unlocks → answers poll and previews verified attendee vibes.
4. **Attendance**: Arrives at venue → Organizer scans dynamic QR pass → App flips to "Live Event Mode".
5. **Connection**: Mingles organically using conversation prompt cards → secretly taps "Spark" on profiles of people they liked.
6. **Continuation**: Next morning at 10 AM → Mutual Spark confirmed → Direct chat opens with pre-populated coffee date suggestion.`;

async function main() {
  await prisma.project.update({
    where: { slug: "lovekonnection-dating-app" },
    data: {
      caseStudy: detailedWalkthrough
    }
  });
  console.log("LoveKonnection detailed walkthrough updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
