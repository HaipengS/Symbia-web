export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Mosaic tile emphasis. Assigned by hand → deterministic, stable across renders. */
  size: "small" | "medium" | "large" | "wide" | "tall";
  /** object-position focal point for tiles that crop (default "50% 50%"). */
  objectPosition?: string;
};

const P = "/products";

/**
 * Single source of truth for the Gallery mosaic. Add a new image by dropping an
 * optimized file into public/products and appending one record here — no JSX per image.
 *
 * Order + `size` are curated so the dense grid packs into a clean rectangle: exactly
 * 2 large + 4 tall + 4 wide (48 tile-units, a multiple of the row width), with flat-lay
 * shots placed in the landscape "wide" tiles and lifestyle heroes in "large". Product &
 * lifestyle only — raw-material / process shots live on Research.
 */
export const galleryImages: GalleryImage[] = [
  { id: "jacket-model-02", src: `${P}/jacket-model-02.jpg`, alt: "A model wearing a Symbia bioleather jacket", width: 1333, height: 2000, size: "large", objectPosition: "50% 26%" },
  { id: "tote-lifestyle-01", src: `${P}/totebag-3.jpg`, alt: "A model carrying a Symbia bioleather tote bag", width: 1066, height: 1600, size: "medium", objectPosition: "50% 34%" },
  { id: "keychain-01", src: `${P}/keychain-01.jpg`, alt: "A Symbia bioleather keychain strap held up", width: 1333, height: 2000, size: "small", objectPosition: "50% 40%" },
  { id: "patterned-jacket-02", src: `${P}/patterned-jacket-02.jpg`, alt: "A Symbia jacket with an orange batik lining", width: 1333, height: 2000, size: "medium" },
  { id: "pouch-pair-01", src: `${P}/pouch-pair-01.jpg`, alt: "A pair of Symbia bioleather pouches", width: 1333, height: 2000, size: "small" },
  { id: "patterned-jacket-01", src: `${P}/patterned-jacket-01.jpg`, alt: "A batik-panelled Symbia jacket on a rack", width: 1333, height: 2000, size: "tall" },
  { id: "floor-lamp-02", src: `${P}/floor-lamp-02.jpg`, alt: "A lit Symbia bioleather floor lamp", width: 1333, height: 2000, size: "tall" },
  { id: "accessories-flatlay", src: `${P}/240516-46.jpg`, alt: "Symbia bioleather wallets, keychains, and accessories arranged flat", width: 1066, height: 1600, size: "wide", objectPosition: "50% 45%" },
  { id: "jacket-model-03", src: `${P}/jacket-model-03.jpg`, alt: "A model wearing a Symbia bioleather jacket, front", width: 1485, height: 2000, size: "medium", objectPosition: "50% 30%" },
  { id: "wine-holder-01", src: `${P}/240516-52.jpg`, alt: "A Symbia bioleather wine holder", width: 1066, height: 1600, size: "small" },
  { id: "bag-interior", src: `${P}/symbia-bag-10.jpg`, alt: "Inside a batik-lined Symbia bag", width: 1280, height: 1600, size: "medium" },
  { id: "sandals-worn", src: `${P}/fill-it-17.jpg`, alt: "Symbia bioleather sandals, worn", width: 1066, height: 1600, size: "medium", objectPosition: "50% 60%" },
  { id: "long-wallet-01", src: `${P}/long-wallet-01.jpg`, alt: "A Symbia bioleather long wallet", width: 1333, height: 2000, size: "small" },
  { id: "jacket-blue-collar-01", src: `${P}/jacket-blue-collar-01.jpg`, alt: "A Symbia jacket with a blue batik collar", width: 1333, height: 2000, size: "medium" },
  { id: "batik-tote-model", src: `${P}/symbia-bag-4.jpg`, alt: "A model carrying a batik-patterned Symbia tote", width: 1280, height: 1600, size: "large", objectPosition: "50% 24%" },
  { id: "hanging-jacket-01", src: `${P}/240818-9.jpg`, alt: "A patterned Symbia jacket on a hanger", width: 1066, height: 1600, size: "medium" },
  { id: "passport-holder-01", src: `${P}/passport-holder-01.jpg`, alt: "A Symbia bioleather passport holder", width: 1333, height: 2000, size: "small" },
  { id: "sneakers-01", src: `${P}/fill-it-12.jpg`, alt: "Sneakers made from Symbia bioleather", width: 1066, height: 1600, size: "medium" },
  { id: "tote-lifestyle-02", src: `${P}/tote-lifestyle-02.jpg`, alt: "A model carrying a blue-strapped Symbia tote", width: 1333, height: 2000, size: "medium", objectPosition: "50% 32%" },
  { id: "jacket-hanging-01", src: `${P}/jacket-hanging-01.jpg`, alt: "A Symbia bioleather jacket on a rack", width: 1333, height: 2000, size: "tall" },
  { id: "jacket-model-04", src: `${P}/jacket-model-04.jpg`, alt: "A model wearing a Symbia bioleather jacket, side", width: 1333, height: 2000, size: "tall", objectPosition: "50% 36%" },
  { id: "wallet-flatlay", src: `${P}/240516-19.jpg`, alt: "A Symbia bioleather wallet with sunglasses and a watch, flat lay", width: 1066, height: 1600, size: "wide", objectPosition: "50% 50%" },
  { id: "sandals-01", src: `${P}/sandals-11.jpg`, alt: "Symbia bioleather sandals", width: 1066, height: 1600, size: "medium" },
  { id: "wallet-hand-01", src: `${P}/wallet-hand-01.jpg`, alt: "A hand placing a Symbia bioleather wallet", width: 1333, height: 2000, size: "small", objectPosition: "50% 45%" },
  { id: "jacket-model-01", src: `${P}/240614-jaket-2.jpg`, alt: "A model wearing a Symbia bioleather jacket", width: 1066, height: 1600, size: "medium", objectPosition: "50% 30%" },
  { id: "floor-lamp-01", src: `${P}/240818-13.jpg`, alt: "A Symbia bioleather floor lamp in a room", width: 1066, height: 1600, size: "medium" },
  { id: "folder-01", src: `${P}/240516-35.jpg`, alt: "A model holding a Symbia bioleather folder", width: 1066, height: 1600, size: "medium", objectPosition: "50% 45%" },
  { id: "blue-tote-product", src: `${P}/totebag-19.jpg`, alt: "A Symbia tote bag with blue handles", width: 1066, height: 1600, size: "medium" },
  { id: "wine-holder-lifestyle", src: `${P}/240516-58.jpg`, alt: "A model holding a Symbia bioleather wine holder", width: 1066, height: 1600, size: "medium", objectPosition: "50% 34%" },
  { id: "jacket-detail-02", src: `${P}/jacket-detail-02.jpg`, alt: "A Symbia jacket with a batik collar, detail", width: 1333, height: 2000, size: "small" },
  { id: "sandals-02", src: `${P}/fill-it-15.jpg`, alt: "Symbia bioleather sandals on steps", width: 1066, height: 1600, size: "medium" },
  { id: "packaging-01", src: `${P}/sandals-8.jpg`, alt: "Symbia x Polla Polly product packaging", width: 1066, height: 1600, size: "small" },
  { id: "cosmetic-pouch-flatlay", src: `${P}/240516-21.jpg`, alt: "A Symbia cosmetic pouch with accessories, flat lay", width: 1066, height: 1600, size: "wide", objectPosition: "50% 45%" },
  { id: "sandals-packaging", src: `${P}/sandals-19.jpg`, alt: "Symbia sandals with packaging", width: 1066, height: 1600, size: "wide" },
];
