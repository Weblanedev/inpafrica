import Image from "next/image";

type Props = {
  /** Hero on /faq vs compact on affiliate */
  size?: "hero" | "compact";
  className?: string;
};

export default function FaqIllustration({
  size = "hero",
  className = "",
}: Props) {
  const isHero = size === "hero";
  return (
    <div
      className={`relative mx-auto flex items-center justify-center ${isHero ? "max-w-lg" : "max-w-[220px]"} ${className}`}
    >
      <div
        className={`absolute rounded-full bg-gradient-to-br from-gold/25 via-gold/5 to-surface2 blur-2xl ${
          isHero ? "inset-0 scale-110" : "-inset-4"
        }`}
        aria-hidden
      />
      <div
        className={`relative overflow-hidden rounded-full bg-gradient-to-b from-surface2 to-bg shadow-inner ring-1 ring-gold/15 ${
          isHero ? "aspect-square w-full max-w-[min(100%,420px)] p-6 sm:p-8" : "aspect-square w-full p-4"
        }`}
      >
        <Image
          src="/images/faq-illustration.png"
          alt="Illustration of a person using a phone beside a question mark"
          width={640}
          height={480}
          className="h-full w-full object-contain object-center"
          sizes={isHero ? "(max-width: 1024px) 90vw, 420px" : "220px"}
          priority={isHero}
        />
      </div>
    </div>
  );
}
