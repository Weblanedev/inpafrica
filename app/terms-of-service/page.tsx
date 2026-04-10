import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | INP Africa",
  description:
    "Terms and conditions for using INP Africa: buyers, affiliates, vendors, and digital book purchases.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">
        Legal
      </p>
      <h1 className="font-display mt-2 text-4xl font-bold text-text md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-muted">
        Last updated: April 2026
      </p>

      <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted">
        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Agreement
          </h2>
          <p>
            By creating an account or using INP Africa (“we”, “us”, “our”),
            including browsing, purchasing digital books, or participating as an
            affiliate or vendor, you confirm that you have read and agree to these
            Terms of Service. If you do not agree, do not use the platform.
          </p>
          <p>
            These terms govern your use of our website and services. We may update
            them from time to time; the current version will always be posted on this
            page. Material changes may be communicated by email or a notice on the
            site. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Buyers &amp; shoppers
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-text">Marketplace access.</strong> You may
              browse and purchase digital books and related products we make
              available, subject to stock, pricing, and regional availability shown
              at checkout.
            </li>
            <li>
              <strong className="text-text">Personal use.</strong> Unless a product
              explicitly grants resale or distribution rights, purchases are for your
              personal or internal business use. You may not resell, redistribute,
              publicly share, or sublicense digital files except as permitted by law
              or the product licence.
            </li>
            <li>
              <strong className="text-text">Refunds.</strong> Refund eligibility
              depends on the product and vendor terms shown at purchase. Where a
              vendor offers a money-back period, follow their policy and contact our
              support before opening payment disputes with your bank or processor.
            </li>
            <li>
              <strong className="text-text">Account security.</strong> You are
              responsible for keeping your login credentials and member access codes
              (where applicable) confidential. You are liable for activity under your
              account until you notify us of unauthorized use.
            </li>
            <li>
              <strong className="text-text">Abuse.</strong> We may limit or close
              accounts that misuse refunds, chargebacks, or the platform in ways that
              harm vendors, affiliates, or other users.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Affiliates
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-text">Membership.</strong> Affiliate features
              (including member pricing on books, referral tools, and commissions
              where offered) require a paid affiliate membership as described on our{" "}
              <Link href="/affiliate" className="text-gold hover:underline">
                Affiliate
              </Link>{" "}
              page and at registration. Membership fees are generally non-refundable
              except where required by law or expressly stated at purchase.
            </li>
            <li>
              <strong className="text-text">Promotion.</strong> You may promote
              eligible products using links and materials we provide. Commission
              structures, if any, are set out in your dashboard or plan description.
            </li>
            <li>
              <strong className="text-text">Compliance.</strong> Your marketing must
              comply with applicable laws, including rules on email (e.g. consent
              and unsubscribe where required), truthful claims, and platform-specific
              advertising policies.
            </li>
            <li>
              <strong className="text-text">Confidentiality.</strong> You must not
              misuse customer or vendor data you receive through the program.
            </li>
            <li>
              <strong className="text-text">Payouts.</strong> Payout schedules,
              thresholds, and methods (e.g. bank transfer, mobile money) are described
              in your affiliate area and may change with notice.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Vendors
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-text">Listing &amp; vetting.</strong> Digital
              products may be subject to review. You must have rights to sell and
              deliver what you list, and you must provide accurate sales pages,
              delivery, support, and commission information as we request.
            </li>
            <li>
              <strong className="text-text">Fees.</strong> Vendor fees, platform
              charges, and affiliate commission percentages are as communicated at
              onboarding or in your vendor agreement / dashboard.
            </li>
            <li>
              <strong className="text-text">Intermediary.</strong> We may collect
              payments, route payouts, and facilitate delivery as described in your
              vendor terms. We are not a party to every dispute between you and a
              buyer, but we may step in per our policies.
            </li>
            <li>
              <strong className="text-text">Refunds.</strong> You should publish a
              clear refund policy for your products. We encourage fair windows (e.g.
              30 days) where appropriate for digital goods.
            </li>
            <li>
              <strong className="text-text">Compliance &amp; conduct.</strong> You
              must comply with applicable laws, our acceptable-use rules, and
              requests for information related to your listings.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Intellectual property &amp; content
          </h2>
          <p>
            INP Africa, its branding, and the site’s design are ours or our
            licensors’. Book and course content belongs to authors or vendors unless
            otherwise stated. You receive only the rights granted by your purchase or
            agreement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Disclaimers &amp; limitation of liability
          </h2>
          <p>
            The platform and content are provided “as is” to the extent permitted by
            law. We do not guarantee uninterrupted or error-free operation. To the
            maximum extent permitted by law, we are not liable for indirect,
            incidental, or consequential damages arising from your use of the
            service. Our total liability for any claim relating to these terms or the
            service is limited to the amount you paid us in the twelve (12) months
            before the claim, except where liability cannot be limited by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Governing law &amp; disputes
          </h2>
          <p>
            These terms are governed by the laws of the Federal Republic of Nigeria,
            without regard to conflict-of-law rules. Courts in Nigeria have
            non-exclusive jurisdiction, unless mandatory consumer protections in your
            country require otherwise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-text">
            Contact
          </h2>
          <p>
            Questions about these terms:{" "}
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
          This page is for information and does not constitute legal advice. For
          your own situation, consult a qualified lawyer.
        </p>
      </div>
    </div>
  );
}
