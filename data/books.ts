export interface Book {
  slug: string;
  title: string;
  author: string;
  price: number;
  memberPrice: number;
  category: "affiliate" | "business" | "marketing" | "mindset";
  description: string;
  pages: number;
  format: "Digital PDF" | "eBook";
  rating: number;
  reviews: number;
  coverUrl: string;
  featured: boolean;
  bestseller: boolean;
}

export const books: Book[] = [
  {
    slug: "super-affiliate-marketing-edges",
    title: "Super Affiliate Marketing Edges",
    author: "Jean-Paul Mbarga",
    price: 1450,
    memberPrice: 950,
    category: "affiliate",
    description:
      "Unlock the hidden tactics that top affiliates in Cameroon, Côte d'Ivoire, and Senegal use to dominate their niches. Covers traffic generation via WhatsApp, Facebook Groups, and TikTok; conversion frameworks for CFA-zone buyers; and the mindset shifts that separate 6-figure XAF earners from struggling beginners. Includes real case studies from Central and West Africa.",
    pages: 187,
    format: "Digital PDF",
    rating: 4.8,
    reviews: 214,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=Super+Affiliate",
    featured: true,
    bestseller: true,
  },
  {
    slug: "affiliate-marketing-guide",
    title: "Affiliate Marketing: The Complete Guide",
    author: "Aminata Coulibaly",
    price: 1350,
    memberPrice: 880,
    category: "affiliate",
    description:
      "A step-by-step playbook for building your first affiliate income stream from zero, designed for the African context. Covers joining platforms like Selar and CinetPay-integrated stores, building a WhatsApp broadcast audience, content strategy for French and English-speaking followers, and scaling from side income to full-time revenue in XAF/XOF markets.",
    pages: 143,
    format: "Digital PDF",
    rating: 4.6,
    reviews: 178,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Affiliate+Guide",
    featured: true,
    bestseller: false,
  },
  {
    slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery: Africa Edition",
    author: "Emeka Okonkwo",
    price: 1450,
    memberPrice: 1000,
    category: "marketing",
    description:
      "Master SEO, paid ads, email marketing, and social media in one definitive resource. Written specifically for entrepreneurs in CEMAC and UEMOA zones navigating global digital channels on CFA franc budgets. Covers Meta Ads payment workarounds, Google Ads with Orange Money-funded cards, and local content strategies for Cameroon, Senegal, Mali, and Ivory Coast audiences.",
    pages: 224,
    format: "eBook",
    rating: 4.7,
    reviews: 302,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=Digital+Marketing",
    featured: false,
    bestseller: true,
  },
  {
    slug: "the-business-blueprint",
    title: "The Business Blueprint: Start Strong in Africa",
    author: "Fatou Diallo",
    price: 1200,
    memberPrice: 780,
    category: "business",
    description:
      "From idea to first customer in 90 days, built for the realities of doing business in Francophone Africa. A practical framework for validating your business model, registering via OHADA, building lean with mobile-first tools, and acquiring customers through trusted community channels like WhatsApp and Facebook without a big budget.",
    pages: 160,
    format: "Digital PDF",
    rating: 4.5,
    reviews: 89,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Business+Blueprint",
    featured: false,
    bestseller: false,
  },
  {
    slug: "email-marketing-profits",
    title: "Email Marketing Profits",
    author: "Chidi Eze",
    price: 1100,
    memberPrice: 650,
    category: "marketing",
    description:
      "Build a list that pays you every month, even with a small XAF/XOF budget. Learn segmentation, automation sequences with free tools like Brevo (formerly Sendinblue, popular in francophone Africa), and copywriting techniques in both French and English that turn subscribers into loyal buyers across West and Central African markets.",
    pages: 98,
    format: "Digital PDF",
    rating: 4.4,
    reviews: 156,
    coverUrl: "https://placehold.co/300x420/1E1E38/F5A623?text=Email+Profits",
    featured: false,
    bestseller: false,
  },
  {
    slug: "social-media-monetization",
    title: "Social Media Monetization Handbook",
    author: "Christelle Ngono",
    price: 1150,
    memberPrice: 700,
    category: "marketing",
    description:
      "Turn your Instagram, TikTok, and Facebook presence into real income in CFA franc markets. Covers brand deals with African brands, affiliate links via Selar, digital product sales via CinetPay, and community-building strategies for creators in Cameroon, Côte d'Ivoire, Senegal, Gabon, and beyond. TikTok LIVE gifting strategies included.",
    pages: 112,
    format: "eBook",
    rating: 4.3,
    reviews: 97,
    coverUrl: "https://placehold.co/300x420/1E1E38/2DD4BF?text=Social+Media",
    featured: false,
    bestseller: false,
  },
  {
    slug: "passive-income-playbook",
    title: "Passive Income Playbook: African Markets",
    author: "Kofi Asante",
    price: 1350,
    memberPrice: 900,
    category: "business",
    description:
      "Seven proven passive income streams explained and ranked for XAF and XOF markets. From selling ebooks on Selar to dropshipping with CinetPay checkout, to dividend investing on regional stock exchanges like BRVM (Bourse Régionale des Valeurs Mobilières). Find the model that fits your skills and your local market reality.",
    pages: 135,
    format: "Digital PDF",
    rating: 4.6,
    reviews: 211,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=Passive+Income",
    featured: true,
    bestseller: false,
  },
  {
    slug: "copywriting-secrets",
    title: "Copywriting Secrets That Sell",
    author: "Amina Diallo",
    price: 1500,
    memberPrice: 1020,
    category: "marketing",
    description:
      "The persuasion principles behind high-converting sales pages, email sequences, and ad copy, adapted for African buyers who are skeptical, mobile-first, and value trust above all. Includes 40+ fill-in-the-blank templates in English ready to deploy, with guidance on adapting them for French-speaking audiences across UEMOA and CEMAC zones.",
    pages: 198,
    format: "Digital PDF",
    rating: 4.9,
    reviews: 445,
    coverUrl: "https://placehold.co/300x420/1E1E38/2DD4BF?text=Copywriting",
    featured: true,
    bestseller: true,
  },
  {
    slug: "ecommerce-launch-guide",
    title: "Launch Your eCommerce Store in 30 Days",
    author: "Martial Fotso",
    price: 1300,
    memberPrice: 840,
    category: "business",
    description:
      "A daily action plan for building and launching an online store from a Central or West African base. Covers product sourcing from local suppliers, setting up WooCommerce or Shopify with CinetPay and Notchpay integration, accepting MTN Mobile Money and Orange Money at checkout, and getting your first sale in the CFA franc zone within 30 days.",
    pages: 152,
    format: "eBook",
    rating: 4.5,
    reviews: 134,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=eCommerce+Launch",
    featured: false,
    bestseller: false,
  },
  {
    slug: "millionaire-mindset-africa",
    title: "Millionaire Mindset: African Edition",
    author: "Dr. Viviane Atangana",
    price: 850,
    memberPrice: 600,
    category: "mindset",
    description:
      "Reprogram your money beliefs and build the mental foundation for wealth in the CFA franc world. Specifically written for young Cameroonians, Ivorians, Senegalese, and other francophone Africans breaking generational financial patterns, covering the psychological weight of currency devaluation, colonial economic legacies, and building real wealth despite systemic constraints.",
    pages: 84,
    format: "Digital PDF",
    rating: 4.7,
    reviews: 378,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Millionaire+Mindset",
    featured: false,
    bestseller: true,
  },
  {
    slug: "seo-for-beginners",
    title: "SEO for Beginners: Rank & Bank",
    author: "Yemi Adeola",
    price: 1200,
    memberPrice: 750,
    category: "marketing",
    description:
      "Learn exactly how to rank your website on Google and drive organic traffic without paying for ads. Covers keyword research in English and French, on-page SEO for African niches, local SEO for cities like Douala, Abidjan, Dakar, and Lomé, and link-building strategies that work even with a zero-naira or zero-CFA budget.",
    pages: 107,
    format: "Digital PDF",
    rating: 4.4,
    reviews: 88,
    coverUrl: "https://placehold.co/300x420/1E1E38/F5A623?text=SEO+Beginners",
    featured: false,
    bestseller: false,
  },
  {
    slug: "dropshipping-africa",
    title: "Dropshipping from Africa: The Real Guide",
    author: "Emmanuel Fobi",
    price: 1400,
    memberPrice: 920,
    category: "business",
    description:
      "Addresses the unique challenges of running a dropshipping business from a CEMAC or UEMOA country: setting up payment gateways like CinetPay and Notchpay, sourcing from Chinese suppliers with XAF/XOF-funded accounts, managing shipping timelines to African addresses, and building customer trust in markets where online fraud skepticism is high.",
    pages: 176,
    format: "eBook",
    rating: 4.6,
    reviews: 193,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Dropshipping+Africa",
    featured: false,
    bestseller: false,
  },
  {
    slug: "content-marketing-bible",
    title: "The Content Marketing Bible",
    author: "Stella Osei",
    price: 1380,
    memberPrice: 900,
    category: "marketing",
    description:
      "Build authority and drive organic traffic through strategic content tailored to African audiences. Covers blogging in English for pan-African reach, video scripts optimized for low-data consumption, podcasting on African platforms, and repurposing content efficiently across WhatsApp Status, Facebook, and YouTube for UEMOA and CEMAC market audiences.",
    pages: 168,
    format: "Digital PDF",
    rating: 4.5,
    reviews: 124,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=Content+Bible",
    featured: false,
    bestseller: false,
  },
  {
    slug: "freelancing-blueprint",
    title: "Freelancing Blueprint: 6 Figures Online",
    author: "Damilola Adewale",
    price: 1250,
    memberPrice: 800,
    category: "business",
    description:
      "Land your first freelance client in 14 days and scale to six figures in XAF, XOF, or USD. Covers Upwork, Fiverr, and cold outreach from an African base; receiving international payments via Wise, Payoneer, or Wave; pricing your services in a way that makes you competitive globally while earning well in CFA franc terms; and building retainer relationships.",
    pages: 115,
    format: "Digital PDF",
    rating: 4.3,
    reviews: 267,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Freelancing+Blueprint",
    featured: false,
    bestseller: false,
  },
  {
    slug: "mobile-money-marketing",
    title: "Mobile Money Marketing: Sell More with MTN & Orange",
    author: "Rodrigue Talla",
    price: 1180,
    memberPrice: 720,
    category: "affiliate",
    description:
      "Learn how to build a full digital sales funnel that accepts MTN Mobile Money, Orange Money, and Wave, the payment methods your customers actually use. Covers setting up CinetPay and Notchpay checkout, promoting affiliate products to mobile money users, and optimizing your offer for buyers in Cameroon, Ivory Coast, Senegal, Burkina Faso, and Mali.",
    pages: 92,
    format: "eBook",
    rating: 4.2,
    reviews: 76,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/F5A623?text=Mobile+Money",
    featured: false,
    bestseller: false,
  },
  {
    slug: "financial-freedom-roadmap",
    title: "Financial Freedom Roadmap: CFA Zone Edition",
    author: "Uchenna Obi",
    price: 1450,
    memberPrice: 980,
    category: "mindset",
    description:
      "A 12-month money management and investment plan tailored to CFA franc income realities. Covers savings discipline on XAF/XOF salaries, building emergency funds, investing on the BRVM regional stock exchange, real estate in Abidjan and Douala, and building digital income streams that pay in dollars while you spend in CFA: a true wealth-building system for francophone Africa.",
    pages: 144,
    format: "Digital PDF",
    rating: 4.8,
    reviews: 312,
    coverUrl:
      "https://placehold.co/300x420/1E1E38/2DD4BF?text=Financial+Freedom",
    featured: true,
    bestseller: true,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getRelatedBooks(book: Book, limit = 4): Book[] {
  return books
    .filter((b) => b.category === book.category && b.slug !== book.slug)
    .slice(0, limit);
}
