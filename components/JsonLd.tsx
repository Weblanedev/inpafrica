import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/siteMetadata";

/** WebSite JSON-LD for search engines (Google, etc.). */
export default function JsonLd() {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
