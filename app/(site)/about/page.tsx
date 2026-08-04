import Image from "next/image";
import Link from "next/link";
import VideoEmbed from "@/components/VideoEmbed";

export const metadata = {
  title: "About | Symbia",
  description:
    "How a question about materials became Kombucha Bioleather: the origin, what the material is actually like, and everything that has been made from it so far.",
};

/**
 * About carries the brand and product story. Everything about training programmes
 * and environmental offsetting now lives on /impact, which is why the page no
 * longer describes Symbia as "three connected efforts": two of those three were
 * being told twice, once here and once there.
 *
 * Structured after the reference About pages, Polybion's in particular: a
 * chronological story with almost no figures, since the figures belong to /impact.
 */

const SECTION_LABEL =
  "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-amber-warm/70";

// Only dates that can be sourced are given a month. The Ministry gift and the two
// 2024 collaborations are recorded without one.
const timeline = [
  {
    when: "September 2023",
    place: "Jakarta and New York",
    title: "A question about materials",
    body: "A teacher at Jakarta Intercultural School persuades Rayden to take a summer course on nanotechnology at Columbia. It introduces him to microbial leather, and to the idea that the artificial materials around us might be grown instead. The fermentation route it points at is a fraction as toxic as chrome tanning.",
  },
  {
    when: "April 2024",
    place: "Jakarta",
    title: "The first batch",
    body: "A wallet, a pouch and a document holder, made from sheets grown at home. Proof that the material survives being cut, sewn and carried, which is the first thing anyone asks of something grown rather than tanned.",
    image: { src: "/products/long-wallet-01.jpg", alt: "An early Symbia bioleather long wallet" },
  },
  {
    when: "May 2024",
    place: "Bali",
    title: "The 10th World Water Forum",
    body: "Symbia exhibits the material publicly for the first time, alongside the products made from it. It is the first time the sheets are handled by people outside the workshop.",
    image: {
      src: "/timeline/water-forum-booth.jpg",
      alt: "The Symbia exhibit at the 10th World Water Forum in Bali",
    },
  },
  {
    // Dated from the photograph's own capture time, 20 May 2024, which places it on
    // the forum floor rather than at some separate occasion.
    when: "May 2024",
    place: "Bali",
    title: "Into the hands of the Ministry",
    body: "Pieces are gifted to Indonesia's Ministry of Tourism and Creative Economy. The photograph was taken on the forum floor on 20 May, two days after the exhibit opened.",
    image: {
      src: "/timeline/ministry-handover.jpg",
      alt: "Rayden Yap presenting a sheet of Kombucha Bioleather to a government official",
    },
  },
  {
    when: "2024",
    place: "Palo Alto and Jakarta",
    title: "Stanford, and a first collaboration",
    body: "The material is shown at Stanford's SURGE Expo, and the shoe brand Polla Polly releases sandals made with it. It is the first time someone else's product carries Symbia inside it, which is a different kind of proof from making things yourself.",
    image: {
      src: "/products/sandals-8.jpg",
      alt: "Packaging from the Symbia and Polla Polly sandal collaboration",
    },
  },
  {
    when: "August 2025",
    place: "Jakarta",
    title: "The Need for Creativity in Sustainability Efforts",
    body: "A seminar run with Indonesia's Ministry of Creative Economy and KOMIB, in front of a hall of students. Three national outlets covered it, all of them linked further down this page.",
    image: {
      src: "/timeline/ministry-seminar.jpg",
      alt: "Rayden Yap speaking at the Ministry of Creative Economy seminar",
    },
  },
];

/**
 * One frame per category rather than a wall of product shots. About only has to
 * establish that the material reaches finished goods across quite different
 * disciplines; the archive itself is the gallery's job. Naming the category is what
 * makes five images say more than twelve unlabelled ones did.
 */
const range = [
  { src: "/products/jacket-model-02.jpg", alt: "A model wearing a Symbia bioleather jacket", category: "Outerwear" },
  { src: "/products/symbia-bag-4.jpg", alt: "A model carrying a batik-patterned Symbia tote", category: "Bags" },
  { src: "/products/240516-46.jpg", alt: "Symbia wallets, keychains and accessories arranged flat", category: "Small goods" },
  { src: "/products/fill-it-12.jpg", alt: "Sneakers made from Symbia bioleather", category: "Footwear" },
  { src: "/products/floor-lamp-02.jpg", alt: "A lit Symbia bioleather floor lamp", category: "Lighting" },
];

const press = [
  {
    outlet: "DAAI TV",
    title: "Kombucha Tea Turned Into Kombucha Leather Jackets",
    href: "https://www.youtube.com/watch?v=QFm-a9qAQiI",
  },
  {
    outlet: "Media Indonesia, IKON",
    title: "From Kombucha Waste to Leather Jackets and Bags",
    href: "https://epaper.mediaindonesia.com/detail/dari-limbah-kombukha-ke-jaket-dan-tas-kulit",
  },
  {
    outlet: "Indonesia Expat",
    title: "The Future of Functional Sustainability: JIS Student Brews Change with Kombucha-Based Bioleather",
    href: "https://indonesiaexpat.id/education/the-future-of-functional-sustainability-jis-student-brews-change-with-kombucha-based-bioleather/",
  },
  {
    outlet: "LinkUMKM",
    title: "SCOBY Kombucha Leather Innovation by Ignacio Rayden Yap: From Idea to Reality",
    href: "https://linkumkm.id/news/detail/15089/inovasi-kulit-scoby-kombucha-oleh-ignacio-rayden-yap-dari-ide-ke-realitas",
  },
  {
    outlet: "Guild Asia",
    title: "Young Inventor Transforms Kombucha Tea Waste into Eco-Friendly Synthetic Leather",
    href: "https://www.linkedin.com/posts/guildasia_mondaymakers-ignacio-rayden-yap-from-indonesia-activity-7228721061301731328-eUN0/",
  },
  {
    outlet: "Beritakota",
    title: "Symbia and the Ministry of Creative Economy Hold a Youth Empowerment Program",
    href: "https://beritakota.id/symbia-dan-kementerian-ekonomi-kreatif-gelar-program-pemberdayaan-pemuda/",
  },
  {
    outlet: "Terminal News",
    title: "Symbia and the Ministry of Creative Economy Encourage Youth Creativity for Sustainability",
    href: "https://terminalnews.co/symbia-dan-kemenekraf-dorong-kreativitas-pemuda-untuk-keberlanjutan-melalui-program-the-need-for-creativity-in-sustainability-efforts/",
  },
  {
    outlet: "Humaniora",
    title: "Symbia and the Ministry of Creative Economy Encourage Youth Creativity in Sustainability Efforts",
    href: "https://www.humaniora.id/symbia-dan-kemenkraf-dorong-kreativitas-pemuda-dalam-upaya-keberlanjutan/",
  },
  {
    outlet: "Stanford SURGE Expo 2024",
    title: "Symbia exhibits at Stanford",
    href: "https://www.instagram.com/madewithsymbia/p/DDOZyXCzbFx/?img_index=1",
  },
  {
    outlet: "Polla Polly",
    title: "Sandals made with SCOBY and kombucha, in collaboration with Symbia",
    href: "https://www.instagram.com/polla.polly/p/DDmFX7ly5ic/",
  },
  {
    outlet: "Jakarta Intercultural School",
    title: "A rising ecopreneur in the JIS community",
    href: "https://www.instagram.com/reel/C_xPXjtMOiW/",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Opening ── */}
      <header className="mx-auto w-full max-w-[1720px] px-6 pb-16 pt-16 md:px-10 md:pb-20 md:pt-24 lg:px-14">
        <p className={SECTION_LABEL}>About</p>
        <h1 className="mt-6 max-w-[20ch] font-display text-5xl leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          Grown, not manufactured.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-ink/65">
          Symbia is an independent biofabrication group that grows leather from a
          symbiotic culture of bacteria and yeast and recycled kombucha. This is where
          the material came from, what it is actually like, and everything that has
          been made out of it so far.
        </p>
      </header>

      {/* ── Origin ── */}
      <section
        aria-label="Origin"
        className="mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14"
      >
        <div className="grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pt-16 lg:gap-24">
          <div className="flex flex-col gap-6">
            <p className={SECTION_LABEL}>Origin</p>
            <h2 className="max-w-[18ch] font-display text-3xl leading-[1.1] text-ink md:text-[2.75rem]">
              It started as a question about materials
            </h2>
            <p className="max-w-prose text-base leading-[1.7] text-ink/65">
              Whether the artificial materials around us could be replaced by something
              grown rather than manufactured.
            </p>
            <blockquote className="max-w-prose border-l-2 border-coral/40 pl-6 text-[1.0625rem] italic leading-[1.65] text-ink/70">
              &ldquo;My first inception of the idea arrived in September 2023 after
              reminiscing on my summer in New York City: one of my teachers at Jakarta
              Intercultural School had persuaded me to take a summer course on
              nanotechnology at Columbia University, which prompted me to explore the
              potential of natural materials replacing artificial ones.&rdquo;
              <cite className="mt-4 block not-italic text-xs uppercase tracking-[0.12em] text-amber-warm/70">
                Ignacio Rayden Yap, Founder and Head Manufacturer
              </cite>
            </blockquote>
            <p className="max-w-prose text-base leading-[1.7] text-ink/60">
              Symbia works with seasoned artisans and young Gen&nbsp;Z creators alike:
              anyone who hopes to develop eco-friendly products but lacks the resources
              or training to start.
            </p>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/gallery/galery7.png"
              alt="Rayden Yap showing a bioleather jacket at a Symbia workshop"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 620px, 100vw"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* ── The material, at a size where it can actually be read ── */}
      <section aria-label="The material" className="mt-20 md:mt-28">
        <div className="mx-auto mb-10 w-full max-w-[1720px] px-6 md:mb-14 md:px-10 lg:px-14">
          <p className={SECTION_LABEL}>The material</p>
          <h2 className="mt-5 max-w-[20ch] font-display text-4xl leading-[1.05] text-ink md:text-6xl">
            Kombucha Bioleather
          </h2>
        </div>

        <div className="relative aspect-[3/2] w-full md:aspect-[21/9]">
          <Image
            src="/material/grain.jpg"
            alt="Sheets of Symbia Kombucha Bioleather, amber over near-black, showing the grain"
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>

        <div className="mx-auto w-full max-w-[1720px] px-6 pt-12 md:px-10 md:pt-16 lg:px-14">
          {/* Centred: the image stack runs taller than the copy, and top-aligning
              the two dumps all of the difference into one empty corner. */}
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16 lg:gap-24">
            <div className="flex flex-col gap-5">
              <p className="text-base leading-[1.7] text-ink/70">
                Bacteria and yeast ferment recycled kombucha and grow cellulose into a
                sheet. Nothing is tanned. The colour runs from pale amber to almost
                black, the edges are translucent and irregular, and the surface keeps
                the grain it grew with, so no two sheets are the same.
              </p>
              <p className="text-base leading-[1.7] text-ink/70">
                It folds and drapes rather than holding a shape, and it is light in the
                hand for its size.
              </p>
              <p className="text-[0.9375rem] leading-[1.7] text-ink/55">
                Thickness is set by how long a sheet is left to ferment, and the two
                faces of one sheet can differ in texture. We say so plainly because it
                is the part of working with a grown material that a designer needs to
                plan around.
              </p>
              <p className="pt-1 text-[0.9375rem] leading-[1.7] text-ink/55">
                The cultivation process itself is set out on the{" "}
                <Link
                  href="/research"
                  className="text-ink/75 underline decoration-ink/25 underline-offset-4 transition hover:text-coral"
                >
                  research page
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative col-span-2 aspect-[3/2] overflow-hidden">
                <Image src="/material/scale.jpg" alt="A full sheet of bioleather held up by hand" fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" unoptimized />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/material/drape.jpg" alt="A sheet of bioleather folded over a hand" fill className="object-cover" sizes="25vw" unoptimized />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image src="/material/stack.jpg" alt="Finished sheets of bioleather folded in a stack" fill className="object-cover" sizes="25vw" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        aria-label="How Symbia got here"
        className="mx-auto w-full max-w-[1720px] px-6 py-20 md:px-10 md:py-28 lg:px-14"
      >
        <div className="grid gap-8 border-t border-ink/15 pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end md:gap-16 md:pt-16">
          <div>
            <p className={SECTION_LABEL}>How we got here</p>
            <h2 className="mt-5 max-w-[16ch] font-display text-4xl leading-[1.05] text-ink md:text-6xl">
              Two years, from a summer course to a ministry stage
            </h2>
          </div>
          <p className="text-lg leading-[1.65] text-ink/65">
            Symbia is young enough that the whole of it fits on one page. Every date
            below is one we can point at: a photograph, an exhibition listing, or an
            article someone else wrote.
          </p>
        </div>

        <ol className="mt-14 flex flex-col md:mt-20">
          {timeline.map((entry) => (
            <li
              key={entry.title}
              // Image column narrowed from 22rem and the padding pulled in: the frame
              // was setting a row height the copy could not fill, so every row opened
              // a hole under its own text.
              className="grid gap-6 border-t border-ink/12 py-8 last:border-b md:grid-cols-[9rem_minmax(0,1fr)_17rem] md:gap-10 md:py-10 lg:gap-14"
            >
              <div className="flex flex-col gap-1">
                <p className="font-display text-xl text-coral md:text-2xl">{entry.when}</p>
                <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/40">
                  {entry.place}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="max-w-[24ch] font-display text-[1.75rem] leading-[1.15] text-ink md:text-4xl">
                  {entry.title}
                </h3>
                <p className="max-w-prose text-lg leading-[1.65] text-ink/70">
                  {entry.body}
                </p>
              </div>
              {entry.image ? (
                // 4:3 rather than 3:2. These are phone photographs of people, and the
                // wider frame was cropping heads out of the top.
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 17rem, 100vw"
                    unoptimized
                  />
                </div>
              ) : (
                <span aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── What it becomes ── */}
      <section aria-label="What the material becomes" className="bg-cream/40 py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1720px] px-6 md:px-10 lg:px-14">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-end md:gap-16">
            <div>
              <p className={SECTION_LABEL}>What it becomes</p>
              <h2 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.05] text-ink md:text-6xl">
                Jackets, bags, lamps, and everything since
              </h2>
            </div>
            <p className="text-base leading-[1.7] text-ink/65">
              The goal is a single loop that connects waste recovery, new material
              development and product creation: from a brewery&apos;s discarded kombucha
              to a finished object in someone&apos;s hands.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:grid-cols-5 md:gap-x-5">
            {range.map((item) => (
              <figure key={item.src} className="flex flex-col gap-3">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20vw, 50vw"
                    unoptimized
                  />
                </div>
                <figcaption className="text-[0.6875rem] uppercase tracking-[0.16em] text-ink/50">
                  {item.category}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-[0.9375rem] leading-[1.7] text-ink/55">
            More of the archive is on the{" "}
            <Link
              href="/gallery"
              className="text-ink/75 underline decoration-ink/25 underline-offset-4 transition hover:text-coral"
            >
              gallery page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Video ── */}
      <section
        aria-label="Symbia on DAAI TV"
        className="mx-auto w-full max-w-[1720px] px-6 py-20 md:px-10 md:py-28 lg:px-14"
      >
        <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-5">
            <p className={SECTION_LABEL}>On television</p>
            <h2 className="font-display text-3xl leading-[1.1] text-ink md:text-4xl">
              The whole thing, explained in a workshop
            </h2>
            <p className="text-base leading-[1.7] text-ink/60">
              DAAI TV followed the process from brewed tea to a finished jacket.
            </p>
          </div>
          <VideoEmbed
            id="QFm-a9qAQiI"
            title="DAAI TV: Kombucha tea turned into kombucha leather jackets"
            caption="DAAI Magazine, Tek Tok. In Indonesian."
          />
        </div>
      </section>

      {/* ── Press ── */}
      <section
        aria-label="Press and recognition"
        className="mx-auto w-full max-w-[1720px] px-6 pb-24 md:px-10 md:pb-32 lg:px-14"
      >
        <div className="border-t border-ink/15 pt-12 md:pt-16">
          <p className={SECTION_LABEL}>Written about</p>
          <h2 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.05] text-ink md:text-5xl">
            Other people&apos;s account of it
          </h2>
        </div>

        <ul className="mt-10 flex flex-col md:mt-14">
          {press.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-1 border-t border-ink/12 py-5 transition-colors hover:bg-ink/[0.02] md:grid-cols-[16rem_minmax(0,1fr)_2rem] md:items-baseline md:gap-8"
              >
                <span className="text-[0.8125rem] uppercase tracking-[0.1em] text-amber-warm/80">
                  {item.outlet}
                </span>
                <span className="text-base leading-[1.55] text-ink/75 transition-colors group-hover:text-ink">
                  {item.title}
                </span>
                <span
                  className="hidden text-ink/25 transition-colors group-hover:text-coral md:inline"
                  aria-hidden
                >
                  &#8599;
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-12 border-t border-ink/12 pt-8 text-base leading-[1.7] text-ink/60">
          The training programmes and the environmental side of the work are set out on
          the{" "}
          <Link
            href="/impact"
            className="text-ink underline decoration-coral/50 underline-offset-4 transition hover:text-coral"
          >
            impact page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
