/**
 * The four kinds of enquiry Symbia actually gets, taken from what the site already
 * says it does: the material itself, the by-products it is grown from, the training
 * programmes on /impact, and the press wall on /about.
 *
 * Splitting them is the whole point of the page. Modern Synthesis, the closest
 * comparable company, routes brands to a form, press to a dedicated address and
 * students to office hours rather than pooling everything in one box; NFW goes
 * further and has no general form at all. A materials company's inbox is mixed by
 * default, and the choice made here rides along to Rayden as the subject line.
 *
 * Shared by the form and by the server action, so the label that appears in the
 * email is the same string the visitor picked and cannot drift from it.
 */

export type ContactTopic = {
  id: string;
  /** Shown on the option itself. */
  label: string;
  /** One line under the label saying what belongs here. */
  blurb: string;
  /** Replaces the label above the message field once this option is chosen. */
  messageLabel: string;
  messagePlaceholder: string;
};

export const CONTACT_TOPICS: ContactTopic[] = [
  {
    id: "brand",
    label: "A brand or designer",
    blurb: "Samples, sheet sizes, volumes and lead times.",
    messageLabel: "What are you making?",
    messagePlaceholder:
      "The product you have in mind, roughly how much material it would take, and when you would need it.",
  },
  {
    id: "supplier",
    // Wording follows the Research page's supplier form, which stays where it is.
    label: "An organic by-product to supply",
    blurb: "Kombucha SCOBY, spent tea, coffee grounds and the like.",
    messageLabel: "Your business and by-product",
    messagePlaceholder:
      "What your business makes, the by-product it generates, rough quantity, and how often it is available.",
  },
  {
    id: "teaching",
    label: "Teaching, a workshop or a talk",
    blurb: "Sessions for schools, villages and vocational centres.",
    messageLabel: "Who would attend?",
    messagePlaceholder:
      "Where you are, who would be in the room, roughly how many people, and the dates you have in mind.",
  },
  {
    id: "press",
    label: "Press",
    blurb: "Interviews, images and background on the material.",
    messageLabel: "What are you working on?",
    messagePlaceholder:
      "Your publication, what the piece covers, and your deadline.",
  },
];

export const DEFAULT_TOPIC_ID = CONTACT_TOPICS[0].id;

/** The label for a submitted id, or null if the value is not one we published. */
export function topicLabel(id: string | null | undefined): string | null {
  if (!id) return null;
  return CONTACT_TOPICS.find((t) => t.id === id)?.label ?? null;
}
