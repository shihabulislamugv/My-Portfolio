const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mauritiusWalkthrough = `### Executive Summary & Design Architecture
'This is Mauritius' is a mobile travel, exploration, and lifestyle platform engineered to solve the fragmentation of tourism discovery across the island nation of Mauritius.

---

### Phase 1: Contextual Onboarding & Traveler Profiling

#### 1.1 Welcome & Travel Mode Selector
- **Purpose**: Instantly tailors the application interface between two distinct audiences: **International Tourists** (needing currency conversion, offline guides, airport transfers) and **Local Island Residents** (seeking weekend events, new restaurants, and nightlife).
- **Interactions**: Single toggle ("Visiting Mauritius" vs. "Living in Mauritius").
- **Next Step**: Select travel style tags (e.g., Luxury & Spas, Adventure & Hiking, Budget Backpacker, Family Friendly).

#### 1.2 Permission & Offline Map Cache Prompt
- **Purpose**: Prompts user to download the lightweight offline map pack (under 45MB) while still connected to hotel/airport Wi-Fi.
- **Validations & Edge Cases**: Checks device storage and network connection type; provides clear explanation of battery and roaming data savings.

---

### Phase 2: Exploration & Curated Discovery Feed

#### 2.1 The Dynamic Island Feed (Main Screen)
- **Purpose**: Inspires discovery through visual categorization, weather-integrated suggestions, and real-time conditions.
- **Information Displayed**:
  - Live Weather & UV Index banner (e.g., "North Coast: Sunny 28°C — Perfect for Trou aux Biches beach").
  - "Happening This Weekend": Live local cultural festivals, beach parties, and culinary pop-ups.
  - Curated Categories: Beaches, Waterfalls & Hikes, Creole Gastronomy, Catamaran Cruises, Historical Sites.
- **Interactions**:
  - Horizontal swipe through curated editorial collections.
  - Floating Toggle: Switch between **Editorial Grid** and **Interactive Island Map**.

#### 2.2 Interactive Island Map with Proximity Filters
- **Purpose**: Enables geographic exploration based on user's current GPS location.
- **Interactions**: Tapping custom pins (color-coded by category: Blue for Water, Green for Nature, Amber for Dining) displays a floating preview card with distance, opening hours, and verified rating.
- **Transitions**: Tapping the preview card smoothly expands into the Venue Dossier.

---

### Phase 3: Venue Dossier & Reservation Flow

#### 3.1 Comprehensive Venue Dossier
- **Purpose**: Gives travelers all decision-making information in a single structured view.
- **Information Displayed**:
  - High-res photo gallery, entrance fees (converted to user's home currency), best time of day to visit, accessibility notes.
  - Direct WhatsApp Host Chat integration for immediate local inquiries.
- **Primary Actions**: "Add to Itinerary" or "Book Excursion / Reserve Table".

#### 3.2 The Algorithmic Smart Itinerary Builder
- **Purpose**: Eliminates travel fatigue by automatically grouping selected spots geographically.
- **Mechanism**: Calculates drive times across winding island roads and organizes activities into a seamless Day 1 / Day 2 / Day 3 schedule.
- **Actions**: Drag-and-drop reordering, export to Google Maps route, or share itinerary with travel companions via SMS/WhatsApp.

---

### Complete End-to-End User Flow Summary

1. **Arrival**: Tourist opens app at SSR International Airport → downloads offline island pack.
2. **Inspiration**: Opens Discovery Feed → sees recommendation for "Chamarel Seven Coloured Earth & Waterfall".
3. **Planning**: Adds Chamarel to itinerary → system automatically pairs it with a nearby Creole rum distillery for lunch.
4. **Navigation**: Uses offline GPS map with turn-by-turn guidance without roaming data charges.
5. **Memory**: Saves favorite spots into a personal "My Mauritius Passport" collection with custom travel notes.`;

const memorialWalkthrough = `### Executive Summary & Narrative Architecture
Memorial Moments Magazine is a mobile publishing application crafted to preserve, typeset, and celebrate family memories, life retrospectives, and milestone stories in a timeless editorial format.

---

### Phase 1: Story Room Creation & Collaborative Circle

#### 1.1 Story Creation Wizard
- **Purpose**: Initiates a new memorial or celebratory chronicle (e.g., "Grandpa Arthur: A Century of Stories" or "The Henderson Family Archive").
- **Interactions**: User selects story theme (Memorial & Tribute, Milestone Anniversary, Childhood Retrospective), sets privacy controls, and establishes chapter structure.
- **Next Step**: Invites trusted family contributors via secure one-time invite links.

#### 1.2 Contributor Permission Matrix
- **Roles**:
  - *Chief Editor*: Approves content, edits final typography, orders physical prints.
  - *Family Contributor*: Submits photos, voice memos, and written memories.
  - *Viewer*: Read-only digital access.

---

### Phase 2: Memory Capture & Multi-Modal Contribution

#### 2.1 The Memory Intake Canvas
- **Purpose**: Makes it painless for family members of all ages (including non-tech-savvy elders) to contribute.
- **Features**:
  - **Voice-to-Story Dictation**: Grandparents can record audio memories; built-in speech engine transcribes them into readable narrative paragraphs.
  - **Archival Photo Scanner**: Built-in perspective-correcting camera scanner that removes glare from physical vintage photographs.
  - **Chronological Date Pin**: Contributors tag approximately when the memory took place (e.g., "Summer of 1974").

---

### Phase 3: The Automated Editorial Typesetting Engine

#### 3.1 Digital Magazine Layout Engine
- **Purpose**: Automatically turns raw user uploads into magazine-quality editorial spreads without requiring design skills.
- **Features**:
  - Automatic balance between pull quotes, captions, and large full-bleed imagery.
  - Heritage typography palettes (high-legibility serif headings paired with clean modern body text).
- **Interactions**: Editors can swap layout templates with a single tap (e.g., "Photo Collage", "Long-form Memoir", "Quote Feature").

#### 3.2 Interactive Page-Turn Reader
- **Purpose**: Delivers a tactile, sensory reading experience on tablets and smartphones.
- **Interactions**: Realistic physics-based page curl animations, embedded audio playback buttons right next to quotes (hear the loved one's actual voice while reading their words), and bookmarking.

---

### Phase 4: Keepsake Print-on-Demand Pipeline

#### 4.1 Print Pre-Flight Validation
- **Purpose**: Ensures physical books print with zero defects before payment.
- **Checks**:
  - Flags low-resolution vintage photos with a gentle warning.
  - Validates gutter margins so text isn't swallowed by the book binding.
- **Actions**: Select cover format (Hardcover Linen, Softcover Magazine, Foil-Stamped Leatherette).

#### 4.2 Checkout & Multi-Address Family Shipping
- **Purpose**: Allows the creator to order physical keepsake books and ship copies directly to relatives in different cities/countries in a single order.`;

async function main() {
  await prisma.project.update({
    where: { slug: "this-is-mauritius-travel-app" },
    data: { caseStudy: mauritiusWalkthrough }
  });
  await prisma.project.update({
    where: { slug: "memorial-moments-magazine" },
    data: { caseStudy: memorialWalkthrough }
  });
  console.log("All case study walkthroughs updated successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
