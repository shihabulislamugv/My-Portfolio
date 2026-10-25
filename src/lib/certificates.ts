export interface Certificate {
  id: string;
  verificationId: string;
  title: string;
  issuer: string;
  issuerBadgeBg: string;
  platform: string;
  issueDate: string;
  image: string;
  description: string;
  verifyUrl: string;
  skills: string[];
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "microsoft-product-design",
    verificationId: "J4W0KI4VK2S6",
    title: "Product Design and UX/UI Fundamentals",
    issuer: "Microsoft",
    issuerBadgeBg: "bg-blue-600",
    platform: "Coursera Verified",
    issueDate: "Sep 15, 2026",
    image: "/uploads/microsoft-product-design-certificate.jpg",
    description: "Officially issued by Microsoft via Coursera to Md. Shihabul Islam. Validates core competencies in human-centered design research, user journey mapping, wireframing, high-fidelity UI systems, and interactive prototyping.",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6",
    skills: ["User Journey Mapping", "Wireframing", "UI Systems", "Prototyping", "Design Research"]
  },
  {
    id: "ibm-ux-research-ia",
    verificationId: "3U1SENH82PI3",
    title: "UX Research and Information Architecture",
    issuer: "IBM",
    issuerBadgeBg: "bg-indigo-700",
    platform: "Coursera Verified",
    issueDate: "Oct 2026",
    image: "/uploads/ibm-ux-research-certificate.jpeg",
    description: "Officially issued by IBM via Coursera to Md. Shihabul Islam. Validates professional expertise in UX research methodologies, user interviews, persona development, affinity mapping, card sorting, tree testing, and human-centered information architecture.",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/3U1SENH82PI3",
    skills: ["UX Research", "Information Architecture", "Persona Development", "Card Sorting", "Usability Testing", "Affinity Mapping"]
  }
];
