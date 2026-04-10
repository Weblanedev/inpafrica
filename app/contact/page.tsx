import ContactForm from "@/components/ContactForm";
import { AFFILIATE_TAGLINE } from "@/lib/siteCopy";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <h1 className="font-display text-4xl font-bold text-text">Get in Touch</h1>
      <p className="mt-4 max-w-2xl text-muted">
        We’re here to help with orders, affiliates, and vendor questions.{" "}
        {AFFILIATE_TAGLINE}
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactForm />
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
            <h3 className="font-semibold text-text">Email</h3>
            <a
              href="mailto:support@inpafrica.app"
              className="mt-3 inline-block text-gold hover:underline"
            >
              support@inpafrica.app
            </a>
          </div>
          <div className="rounded-xl border border-border bg-surface p-8 shadow-sm">
            <h3 className="font-semibold text-text">Hours</h3>
            <p className="mt-3 text-sm text-muted">
              Mon to Fri 9:00 to 18:00 WAT · Sat 10:00 to 14:00 WAT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
