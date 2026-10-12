import type { LegalDocument } from "./legal.types";

export const PRIVACY_DOCUMENT: LegalDocument = {
  slug: "privacy",
  title: "Privacy policy",
  intro: "How CONVET collects, uses and protects the personal information of pet owners and the health information of their animals when they use this website and client area.",
  sections: [
    {
      heading: "Who we are",
      paragraphs: ["CONVET — Contreras Veterinary Services N.V., Aruba, is responsible for the information described here. [Registered address and company details to be confirmed.]"],
    },
    {
      heading: "Information we collect",
      bullets: [
        "Account: name, email address, mobile/WhatsApp number and password (stored encrypted).",
        "Pets: name, species, breed, color, sex, date of birth and photo.",
        "Appointments: date, time, service, chosen vet and notes you add.",
        "Clinical records created by our vets: visits, vaccinations, treatments, diagnoses and prescribed medications.",
        "Technical data: basic, cookie-free usage statistics.",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "To book and manage appointments, keep your pets’ clinical history, send confirmations and reminders by email or WhatsApp, and answer your questions. [Legal bases to be confirmed by counsel.]",
      ],
    },
    {
      heading: "Accounts, owners and pets",
      paragraphs: [
        "Each pet belongs to an owner account. You only see the pets and records linked to your account. Our team accesses records according to their role (vet, assistant, reception, admin).",
      ],
    },
    {
      heading: "Appointments and clinical records",
      paragraphs: [
        "Clinical records are kept for at least 5 years and are not deleted automatically. [Exact retention period to be confirmed.] You can see vaccines, appointments, active treatments and the vet summary; full clinical notes stay with the clinic.",
      ],
    },
    {
      heading: "Security and retention",
      paragraphs: ["Data is sent over encrypted connections, access is logged and staff accounts use 2-step verification. [Hosting providers and locations to be listed.]"],
    },
    {
      heading: "Sharing your information",
      paragraphs: ["We do not sell your data. We only share it with providers that help us run the service (hosting, email, messaging) or when required by law. [Provider list pending.]"],
    },
    {
      heading: "Your rights and contact",
      paragraphs: [
        "You can ask to see, correct or delete your personal information, subject to legal record-keeping duties. Contact us at [privacy email pending], WhatsApp +297 593 0404 or at the clinic.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: ["We will post updates on this page and change the “Last updated” date. Important changes will be announced by email."],
    },
  ],
  related: { label: "Read the terms", href: "/terms", note: "Write to us on WhatsApp or visit the clinic. Related: Terms & conditions." },
};

export const TERMS_DOCUMENT: LegalDocument = {
  slug: "terms",
  title: "Terms & conditions",
  intro: "The rules for using the CONVET website, client area and online booking. Please read them before creating an account or booking a visit.",
  sections: [
    {
      heading: "Introduction",
      paragraphs: ["These terms apply to everyone who uses this website or a CONVET client account. By using the platform you accept them. [Governing law and jurisdiction to be confirmed.]"],
    },
    {
      heading: "Using the platform",
      paragraphs: [
        "The site lets you learn about our services and products, manage your pets’ profiles, see their health summary and request appointments. Product information is for reference only — there are no online sales.",
      ],
    },
    {
      heading: "Accounts and your responsibilities",
      bullets: [
        "Keep your login details private and your contact information up to date.",
        "Only add pets you own or are authorised to manage.",
        "Tell us about allergies, medical alerts or changes that may affect your pet’s care.",
      ],
    },
    {
      heading: "Appointments: booking and changes",
      bullets: [
        "Visits are offered in 10-minute slots; a slot accepts a limited number of requests (currently up to 5).",
        "You can reschedule free of charge up to 24 hours before. Cancelling stays available from your appointment.",
        "Emergencies are never booked online — call 593-0404, 24/7.",
        "[No-show and late-arrival policy to be confirmed.]",
      ],
    },
    {
      heading: "Pet information and services",
      paragraphs: ["Information you enter about your pets is used to provide veterinary care. Treatment decisions are always made by our vets during the consultation."],
    },
    {
      heading: "Service availability",
      paragraphs: [
        "We aim to keep the platform available but it may be paused for maintenance or for reasons outside our control. Booking times shown are subject to the clinic’s and each vet’s availability.",
      ],
    },
    {
      heading: "Responsibilities and limitations",
      paragraphs: ["[Limitation-of-liability wording to be provided by counsel. Do not publish this section until approved.]"],
    },
    {
      heading: "Contact and updates",
      paragraphs: [
        "Questions about these terms: [legal contact email pending] or WhatsApp +297 593 0404. We will post changes on this page with a new “Last updated” date.",
      ],
    },
  ],
  related: { label: "Read the privacy policy", href: "/privacy", note: "Write to us on WhatsApp or visit the clinic. Related: Privacy policy." },
};
