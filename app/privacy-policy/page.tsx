import type { Metadata } from "next";
import Link from "next/link";

const privacyDesc =
  "How INP Africa collects, uses, and protects your personal information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDesc,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | INP Africa",
    description: privacyDesc,
    url: "/privacy-policy",
  },
  twitter: {
    title: "Privacy Policy | INP Africa",
    description: privacyDesc,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">
        Legal
      </p>
      <h1 className="font-display mt-2 text-3xl font-bold text-text sm:text-4xl md:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: April 2026
      </p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Introduction
          </h2>
          <p>
            INP Africa (“we”, “us”, “our”) operates the website and services
            available through inpafrica (the “Service”). This Privacy Policy explains
            how we collect, use, store, and share personal information when you visit
            our site, create an account, purchase products, or participate as an
            affiliate or vendor.
          </p>
          <p>
            By using the Service, you agree to this Privacy Policy. If you do not
            agree, please do not use the site.
          </p>
          <p>
            This policy applies to online information collected through our website
            and related digital channels we control. It does not cover third-party
            sites we link to; their policies apply there.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Information we collect
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-text">Account &amp; profile.</strong> Name,
              username, email address, password (stored securely), phone number,
              location fields (country, state, city) when you register, complete
              checkout, or update your profile.
            </li>
            <li>
              <strong className="text-text">Affiliate &amp; vendor membership.</strong>{" "}
              Account type, membership status, plan, and access codes used for login
              where our program requires them.
            </li>
            <li>
              <strong className="text-text">Orders &amp; payments.</strong> Purchase
              details, cart contents, and payment-related metadata. Payment card data
              is typically handled by our payment partners; we do not store full
              card numbers on our servers unless a specific integration requires it
              and is disclosed at checkout.
            </li>
            <li>
              <strong className="text-text">Communications.</strong> Messages you send
              via contact forms or support, including email content and attachments
              you choose to provide.
            </li>
            <li>
              <strong className="text-text">Technical &amp; usage data.</strong> IP
              address, browser type, device information, pages viewed, and similar
              data via cookies, local storage, and server logs.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            How we use information
          </h2>
          <p>We use personal information to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide, operate, and improve the Service and your account;</li>
            <li>Process orders, memberships, payouts, and refunds;</li>
            <li>Communicate with you about transactions, security, and updates;</li>
            <li>Send optional marketing where you have consented or as permitted by law;</li>
            <li>Detect fraud, abuse, and technical issues;</li>
            <li>Comply with legal obligations and enforce our{" "}
              <Link href="/terms-of-service" className="text-gold hover:underline">
                Terms of Service
              </Link>
              .
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Legal bases (where applicable)
          </h2>
          <p>
            Depending on your region, we rely on one or more of: performance of a
            contract with you; legitimate interests (e.g. securing the platform,
            analytics); consent (e.g. marketing cookies or newsletters); and legal
            obligation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Cookies &amp; similar technologies
          </h2>
          <p>
            We use cookies and similar technologies to remember preferences, keep you
            signed in, understand traffic, and improve the experience. You can control
            cookies through your browser settings. Strictly necessary cookies may be
            required for the site to function.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Log files
          </h2>
          <p>
            Like most sites, we collect data that browsers send automatically, such as
            IP address, browser type, referring pages, and timestamps. We use this for
            security, analytics, and troubleshooting. This data is often aggregated
            and not used to identify individuals except when needed for security or
            legal reasons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Sharing of information
          </h2>
          <p>We may share information with:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-text">Service providers</strong> who host our
              infrastructure, process payments, send email, or help us run the
              business, under confidentiality and data-processing terms;
            </li>
            <li>
              <strong className="text-text">Legal &amp; safety</strong> when required
              by law or to protect rights, safety, and integrity of users and the
              Service;
            </li>
            <li>
              <strong className="text-text">Business transfers</strong> in connection
              with a merger, acquisition, or sale of assets, with notice where
              required.
            </li>
          </ul>
          <p>
            We do not sell your personal information for money. Where “sale” or
            “sharing” has a specific meaning under U.S. state laws, you may have
            opt-out rights described below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Retention
          </h2>
          <p>
            We keep information as long as needed to provide the Service, meet legal
            and accounting requirements, and resolve disputes. When data is no longer
            needed, we delete or anonymize it subject to backup and legal holds.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Your rights
          </h2>
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or export your personal data; restrict or object to certain
            processing; withdraw consent where processing is consent-based; and lodge
            a complaint with a supervisory authority.
          </p>
          <p>
            <strong className="text-text">California (CCPA/CPRA):</strong> California
            residents may have rights to know categories and specific pieces of
            personal information collected, to delete personal information, and to
            opt out of certain sales or sharing. To exercise rights, contact us at
            the email below. We will verify your request as required by law.
          </p>
          <p>
            <strong className="text-text">EEA/UK (GDPR):</strong> If you are in the
            European Economic Area or UK, you have the rights described under GDPR,
            including access, rectification, erasure, restriction, objection, and
            data portability, subject to conditions. You may contact us or your local
            data protection authority.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            International transfers
          </h2>
          <p>
            We may process and store information in Nigeria and other countries where
            we or our providers operate. Where we transfer data across borders, we use
            appropriate safeguards as required by applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Children
          </h2>
          <p>
            The Service is not directed at children under 13 (or the minimum age in
            your jurisdiction). We do not knowingly collect personal information from
            children. If you believe we have, contact us and we will delete it
            promptly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Changes
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the new
            version on this page and adjust the “Last updated” date. For material
            changes, we may provide additional notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Contact
          </h2>
          <p>
            Privacy questions or requests:{" "}
            <a
              href="mailto:support@inpafrica.app"
              className="text-gold hover:underline"
            >
              support@inpafrica.app
            </a>
            .
          </p>
        </section>

        <p className="rounded-lg border border-border bg-surface2 px-4 py-3 text-xs">
          This policy is provided for transparency and does not constitute legal
          advice. Consult a professional for advice specific to your situation.
        </p>
      </div>
    </div>
  );
}
