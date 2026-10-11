import { Clock, Paw, Pill, Stethoscope, Syringe, Tag } from "@/components/ui/Icon";

import type { ServiceFilter, ServiceItem, ServiceVet } from "./services.types";

const VETS: ServiceVet[] = [
  { name: "Dr. Shirley", photo: "dr-shirley" },
  { name: "Dr. Larry", photo: "dr-larry" },
];

const PRICE_FACT = { icon: Tag, title: "Price confirmed at the clinic", detail: "No online payment" };

export const SERVICES: ServiceItem[] = [
  {
    slug: "consultations",
    title: "Consultations",
    icon: Stethoscope,
    duration: "30 min",
    species: ["dogs", "cats", "birds"],
    speciesLabel: "All species",
    summary: "Check-ups, new symptoms, second opinions and senior care. We examine, explain what we found and agree on a plan with you.",
    cardSummary: "Check-ups, new symptoms and second opinions.",
    highlights: ["Full physical exam", "Weight and body condition", "Written summary in your account"],
    bookLabel: "Book consultation",
    panelTitle: "Book a consultation",
    booking: "online",
    lead: "Check-ups, new symptoms, second opinions and senior care. We examine your pet, explain what we found and agree on a plan with you.",
    steps: [
      { title: "Tell us what is going on", detail: "Share symptoms and history so the vet is ready when you arrive." },
      { title: "The exam", detail: "A full physical exam, with weight and body condition recorded." },
      { title: "Your plan", detail: "The vet explains the findings and a written summary appears in your account." },
    ],
    facts: [
      { icon: Clock, title: "About 30 minutes", detail: "Including the exam and the plan" },
      { icon: Paw, title: "Dogs, cats and more", detail: "Birds & exotics welcome" },
      PRICE_FACT,
    ],
    vets: VETS,
    related: ["vaccinations", "treatments"],
    whatsappText: "Hi! I would like to book a consultation.",
  },
  {
    slug: "vaccinations",
    title: "Vaccinations",
    icon: Syringe,
    duration: "20 min",
    species: ["dogs", "cats"],
    speciesLabel: "Dogs · Cats",
    summary: "Core and lifestyle vaccines for dogs and cats, recorded with lot number on your pet's vaccination card.",
    cardSummary: "Core and lifestyle vaccines, recorded on your pet's card.",
    highlights: ["Rabies, DHPP, FVRCP, Leptospirosis", "Booster reminders by email", "Vaccination certificate on request"],
    bookLabel: "Book vaccination",
    panelTitle: "Book a vaccination",
    booking: "online",
    lead: "Core and lifestyle vaccines for dogs and cats. Every dose is recorded with its lot number on your pet's vaccination card, and we remind you before the next booster.",
    steps: [
      { title: "Quick health check", detail: "Temperature, weight and a short exam to make sure your pet is fit for the vaccine." },
      { title: "The vaccine", detail: "A single injection. We use treats and calm handling; cats are seen in a separate room." },
      { title: "Record and reminder", detail: "The dose and lot appear in your account. We email you before the next one is due." },
    ],
    facts: [
      { icon: Clock, title: "About 20 minutes", detail: "Including a quick health check" },
      { icon: Paw, title: "Dogs and cats", detail: "Birds & exotics: ask us first" },
      PRICE_FACT,
    ],
    vets: VETS,
    table: {
      title: "Vaccines we offer",
      columns: ["Vaccine", "Species", "Schedule"],
      rows: [
        ["Rabies", "Dogs · Cats", "Yearly or every 3 years"],
        ["DHPP", "Dogs", "Puppy series, then yearly"],
        ["FVRCP", "Cats", "Kitten series, then every 1–3 years"],
        ["Leptospirosis", "Dogs", "Yearly"],
      ],
    },
    related: ["consultations", "treatments"],
    whatsappText: "Hi! I have a question about vaccinations.",
  },
  {
    slug: "treatments",
    title: "Treatments",
    icon: Pill,
    duration: "20 min",
    species: ["dogs", "cats"],
    speciesLabel: "After a consultation",
    summary: "Follow-up visits, wound care and ongoing treatment plans after a consultation.",
    cardSummary: "Follow-ups and treatment plans.",
    highlights: ["Medication plans with clear instructions", "Progress tracked in the record", "Booked by our team after a consultation"],
    bookLabel: "Ask us first",
    panelTitle: "Ask about a treatment",
    booking: "whatsapp",
    lead: "Follow-up visits, wound care and ongoing treatment plans. Treatments are scheduled by our team after a consultation, so message us first.",
    steps: [
      { title: "Start with a consultation", detail: "The vet decides which treatment your pet needs." },
      { title: "Your treatment plan", detail: "Medication plans come with clear instructions you can follow at home." },
      { title: "Follow-up visits", detail: "Progress is tracked in the record and our team books the next visit with you." },
    ],
    facts: [
      { icon: Clock, title: "About 20 minutes", detail: "Per follow-up visit" },
      { icon: Paw, title: "Dogs and cats", detail: "Birds & exotics: ask us first" },
      PRICE_FACT,
    ],
    vets: VETS,
    related: ["consultations", "vaccinations"],
    whatsappText: "Hi! I would like to ask about a treatment.",
  },
];

export const SERVICE_FILTERS: ServiceFilter[] = [
  { value: "all", label: "All" },
  { value: "dogs", label: "Dogs" },
  { value: "cats", label: "Cats" },
  { value: "birds", label: "Birds & exotics" },
];
