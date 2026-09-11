import type { Locale } from "@/i18n/routing";
import { Stain } from "@/components/ui/Stain";
import { Datenschutz } from "@/components/legal/Datenschutz";

export function PrivacyPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <section className="section pt-12 md:pt-16">
        {/* One quiet mark: a page of law should not shimmer. */}
        <Stain shape="clay" drift="b" className="right-0 top-0 h-[22rem] w-[26rem]" opacity={0.12} />
        <div className="container">
          <Datenschutz locale={locale} />
        </div>
      </section>
    </main>
  );
}
