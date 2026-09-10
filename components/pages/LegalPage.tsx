import type { Locale } from "@/i18n/routing";
import { Impressum } from "@/components/legal/Impressum";

export function LegalPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <Impressum locale={locale} />
        </div>
      </section>
    </main>
  );
}
