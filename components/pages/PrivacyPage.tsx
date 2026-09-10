import type { Locale } from "@/i18n/routing";
import { Datenschutz } from "@/components/legal/Datenschutz";

export function PrivacyPage({ locale }: { locale: Locale }) {
  return (
    <main id="main">
      <section className="section pt-12 md:pt-16">
        <div className="container">
          <Datenschutz locale={locale} />
        </div>
      </section>
    </main>
  );
}
