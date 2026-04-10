import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-text">Not found</h1>
      <p className="mt-4 text-muted">
        We couldn&apos;t find that page or product.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-btn px-6 py-3 font-semibold text-white hover:bg-btn-hover"
      >
        Back home
      </Link>
    </div>
  );
}
