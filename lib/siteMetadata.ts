import type { Metadata } from "next";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export const SITE_NAME = "INP Africa";

/**
 * Public site URL for canonical links, Open Graph, and JSON-LD.
 * Prefer `NEXT_PUBLIC_SITE_URL` (e.g. https://www.yourdomain.com) on Netlify/Vercel.
 * Netlify also sets `URL` during build; Vercel sets `VERCEL_URL`.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  const netlify = process.env.URL?.trim();
  if (netlify && /^https?:\/\//i.test(netlify)) {
    return netlify.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

/** Long-form description for meta tags, social cards, and search snippets. */
export const DEFAULT_DESCRIPTION = `${AFFILIATE_TAGLINE} Shop digital books in XAF; member pricing for affiliates and vendors across Africa.`;

/**
 * Browser tab title (default route). Includes brand + tagline for recognition when sharing tabs.
 */
export const BROWSER_TAB_TITLE = `${SITE_NAME} | ${AFFILIATE_TAGLINE}`;

/**
 * Open Graph / WhatsApp / Facebook link preview title (Digitstem-style: brand only).
 * Use {@link AFFILIATE_TAGLINE} for `og:description` (long body).
 */
export const OG_SHARE_TITLE = SITE_NAME;

/** WhatsApp / Facebook need JPG or PNG (not SVG). Regenerate: `npm run og:share`. */
export const OG_IMAGE_DEFAULT = {
  url: "/assets/og-share.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: digital books and affiliate marketplace`,
} as const;

const keywords = [
  SITE_NAME,
  "digital books",
  "ebooks",
  "affiliate marketing",
  "vendors",
  "Africa",
  "business books",
  "marketing books",
  "CFA",
  "XAF",
  "online bookstore",
] as const;

/**
 * Root layout metadata: SEO, Open Graph, Twitter, and tab title defaults.
 * Child routes can set `title: "Page"` to get `Page | INP Africa` via `title.template`.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(`${getSiteUrl()}/`),
  title: {
    default: BROWSER_TAB_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [...keywords],
  authors: [{ name: SITE_NAME, url: getSiteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: OG_SHARE_TITLE,
    description: AFFILIATE_TAGLINE,
    images: [OG_IMAGE_DEFAULT],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_SHARE_TITLE,
    description: AFFILIATE_TAGLINE,
    images: [OG_IMAGE_DEFAULT.url],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/inpafrica-logo.svg",
    apple: "/inpafrica-logo.svg",
  },
};
