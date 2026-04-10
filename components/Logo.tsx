import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 220 40"
        className="h-8 w-auto text-text"
        aria-label="INP Africa"
      >
        <title>INP Africa</title>
        <text
          x="0"
          y="30"
          fill="currentColor"
          fontSize="26"
          fontWeight="700"
          fontFamily="var(--font-playfair), Georgia, serif"
        >
          INPAFRICA
        </text>
      </svg>
    </Link>
  );
}
