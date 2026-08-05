"use client";

import { useActionState, useState, type ReactNode } from "react";
import { submitContact, type ContactResult } from "@/app/actions/contact";
import {
  CONTACT_TOPICS,
  DEFAULT_TOPIC_ID,
  type ContactTopic,
} from "@/lib/contact-topics";

/**
 * The site's only contact form. ContactSection, the block that used to be dropped
 * into the home, gallery and research pages, is gone: those three now link here.
 *
 * Choosing a topic is a real radio group rather than styled buttons, so it arrives
 * in the FormData on its own and keeps arrow-key navigation for free. The only
 * thing the choice changes on screen is the label and placeholder over the message
 * field, which is what makes it worth asking: the visitor is told what to write.
 */

const initialState: ContactResult = { success: false, error: "" };

const FIELD =
  "w-full rounded-xl border border-ink/12 bg-ink/[0.03] px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink/30 focus:border-coral/40 focus:bg-ink/[0.06]";
const FIELD_LABEL = "text-[0.75rem] uppercase tracking-[0.13em] text-amber-warm/80";

export default function ContactForm({ aside }: { aside: ReactNode }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const [topicId, setTopicId] = useState(DEFAULT_TOPIC_ID);
  const topic =
    CONTACT_TOPICS.find((t) => t.id === topicId) ?? (CONTACT_TOPICS[0] as ContactTopic);

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
      <div>
        {state.success ? (
          <div className="flex flex-col items-start gap-4 border-t border-ink/12 pt-10">
            <span className="font-display text-5xl text-coral" aria-hidden>
              ✓
            </span>
            <h2 className="font-display text-4xl text-ink">Message sent.</h2>
            <p className="max-w-prose text-lg leading-[1.65] text-ink/65">
              It went straight to Rayden, filed under {topic.label.toLowerCase()}.
              Replying to the confirmation reaches the same inbox.
            </p>
          </div>
        ) : (
          <form action={formAction} className="flex flex-col gap-12" autoComplete="off">
            <fieldset className="flex flex-col gap-6">
              <legend className={FIELD_LABEL}>What is this about?</legend>
              <div className="grid gap-px overflow-hidden rounded-xl bg-ink/12 sm:grid-cols-2 xl:grid-cols-4">
                {CONTACT_TOPICS.map((t) => {
                  const checked = t.id === topicId;
                  return (
                    <label
                      key={t.id}
                      className={`flex cursor-pointer flex-col gap-2 p-5 transition-colors ${
                        checked ? "bg-cream" : "bg-soft hover:bg-cream/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={t.id}
                        checked={checked}
                        onChange={() => setTopicId(t.id)}
                        className="sr-only"
                      />
                      <span
                        className={`text-base leading-[1.3] ${
                          checked ? "text-ink" : "text-ink/70"
                        }`}
                      >
                        {t.label}
                      </span>
                      <span className="text-sm leading-[1.5] text-ink/45">{t.blurb}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-6 md:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className={FIELD_LABEL}>Your name</span>
                <input className={FIELD} name="name" type="text" />
              </label>
              <label className="flex flex-col gap-2">
                <span className={FIELD_LABEL}>Email</span>
                <input className={FIELD} name="email" type="email" required />
              </label>
              <label className="flex flex-col gap-2">
                <span className={FIELD_LABEL}>Company or institution</span>
                <input className={FIELD} name="organisation" type="text" />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              {/* The one thing the topic choice changes on screen. */}
              <span className={FIELD_LABEL}>{topic.messageLabel}</span>
              {/* Tall enough that the form column finishes level with the sidebar
                  beside it. At 190px it stopped 135px short and left a hole there,
                  and a contact page is the one place a generous box is wanted. */}
              <textarea
                className={`${FIELD} min-h-[20rem] leading-[1.6]`}
                name="message"
                placeholder={topic.messagePlaceholder}
                required
              />
            </label>

            <div className="flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-soft transition hover:bg-amber-warm disabled:opacity-50"
              >
                {isPending ? "Sending..." : "Send message"}
                {!isPending && <span aria-hidden>↗</span>}
              </button>
              {"error" in state && state.error ? (
                <p className="text-sm text-coral">{state.error}</p>
              ) : null}
            </div>
          </form>
        )}
      </div>

      {aside}
    </div>
  );
}
