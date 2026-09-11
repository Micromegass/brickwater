import type { Locale } from "@/i18n/routing";
import { Stain } from "@/components/ui/Stain";
import { Impressum } from "@/components/legal/Impressum";

export function LegalPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <section className="section pt-12 md:pt-16">
        {/* One quiet mark: a page of law should not shimmer. */}
        <Stain shape="sage" drift="c" className="right-0 top-0 h-[22rem] w-[26rem]" opacity={0.14} />
        <div className="container">
          <Impressum locale={locale} />
        </div>
      </section>
    </main>
  );
}
