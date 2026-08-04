"use client";

import { useState } from "react";

/**
 * A YouTube embed that stays a still image until someone asks for it.
 *
 * Dropping an iframe straight into the page makes every visitor load YouTube's
 * player and its tracking on arrival, whether or not they watch. This renders the
 * poster frame instead and only mounts the iframe on click, so the cost is paid by
 * the people who actually want the video.
 */

type VideoEmbedProps = {
  /** YouTube video id, the part after `v=`. */
  id: string;
  /** Describes the video for anyone who cannot see it, and labels the play button. */
  title: string;
  /** Optional line shown under the frame. */
  caption?: string;
};

export default function VideoEmbed({ id, title, caption }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden bg-earth">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* Not next/image: this is a YouTube-hosted poster and the project does
                not allow remote hosts in its image config. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-earth/25 transition-colors group-hover:bg-earth/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-soft/95 transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
              <span
                className="ml-1 block h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-coral md:border-y-[13px] md:border-l-[21px]"
                aria-hidden
              />
            </span>
          </button>
        )}
      </div>
      {caption ? (
        <figcaption className="text-sm leading-relaxed text-ink/50">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
