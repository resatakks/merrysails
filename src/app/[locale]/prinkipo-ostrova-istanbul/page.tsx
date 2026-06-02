import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Anchor, Ship, MapPin, Clock, Users, Trees } from "lucide-react";
import { SITE_URL, TURSAB_LICENSE_NUMBER, WHATSAPP_URL } from "@/lib/constants";
import { isActiveLocale, type SiteLocale } from "@/i18n/config";

export const revalidate = 3600;

// RU-only — "Принкипо острова" = "Princes Islands" in Russian. Common
// alternative: "Принцевы острова" — used in body text. Slug uses the
// Latin transliteration for URL portability.
export async function generateStaticParams() {
  return [{ locale: "ru" }];
}

const canonicalUrl = `${SITE_URL}/ru/prinkipo-ostrova-istanbul`;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "ru") return {};
  return {
    title: "Принцевы острова Стамбул — от €45",
    description:
      "Тур на Принцевы острова из Стамбула 2026 — общий день €45 (паром + гид + обед) или частная яхта от €280. Бююкада, Хейбелиада, острова без машин.",
    alternates: { canonical: canonicalUrl, languages: undefined },
    openGraph: {
      title: "Принцевы острова Стамбул — от €45",
      description: "Два способа посетить Принцевы острова из Стамбула: общий 8-часовой паромный тур €45 или частная яхта от €280.",
      url: canonicalUrl, type: "article",
    },
  };
}

const ISLANDS = [
  { name: "Бююкада", sizeLabel: "Самый большой · 5,4 км²", summary: "Главная достопримечательность. Деревянные особняки викторианской эпохи, монастырь Айя-Йорги на самой высокой точке, улицы под соснами и популярный пляж Йорюкали. Около 75-90 минут на общественном пароме от Кабаташ." },
  { name: "Хейбелиада", sizeLabel: "Второй по величине · 2,3 км²", summary: "Спокойнее Бююкады, с историческим греко-православным семинарием Халки, красивой прибрежной тропой и зоной пикников Дегирменбурну. Та же паромная остановка, что и Бююкада." },
  { name: "Бургазада", sizeLabel: "Средний · 1,5 км²", summary: "Компактный и уютный. Идеален для расслабленного дня с рыбным обедом на скалах Калпазанкая, лёгкие пешеходные кольца и значительно меньше туристов." },
  { name: "Кыналыада", sizeLabel: "Ближайший к Стамбулу · 1,3 км²", summary: "Первая остановка на паромном маршруте — 40 минут от Кабаташ. Песчаные пляжи, рыбные рестораны на причале и небольшие армянские церкви в деревне." },
];

const FAQ_ITEMS = [
  { q: "Какой самый дешёвый способ посетить Принцевы острова из Стамбула?", a: "Общественный паром Şehir Hatları от Кабаташа стоит около ₺40 (€1,20) в одну сторону и достигает Бююкады за 75-90 минут. Однодневный гид-тур MerrySails за €45 включает паром туда-обратно, гида, обед и структурированную прогулку — удобно, если Вы не хотите ориентироваться сами или читать турецкое расписание." },
  { q: "Разрешены ли машины на Принцевых островах?", a: "Нет — частные автомобили запрещены на всех четырёх обитаемых островах. Единственный моторизованный транспорт — муниципальные электромобили. Местные и гости передвигаются на велосипедах, электрических шаттлах или пешком. Атмосфера без машин — одна из главных особенностей." },
  { q: "Сколько длится тур на Принцевы острова из Стамбула?", a: "Гид-тур полного дня — 8 часов от двери до двери (отправление 09:00, возврат ~17:00). Аренда частной яхты на день обычно 6-8 часов и полностью гибкая — Вы выбираете время, маршрут между островами и сколько оставаться на каждом." },
  { q: "Общий паром или частная яхта — что лучше?", a: "Общий паром (€45/чел.) подходит для одиночных гостей, пар с бюджетом и тех, кто хочет, чтобы гид и обед были организованы. Частная яхта (€280+ за всю лодку, минимум 2 часа, полный день доступен) лучше для групп от 4 человек, семей или тех, кому нужна гибкость — Вы выбираете острова, остановки, тайминг, кейтеринг на борту опционально." },
  { q: "Когда лучшее время для поездки на Принцевы острова?", a: "Конец апреля — начало июня и середина сентября — октябрь идеальны — тепло для купания, прохладно для прогулок и значительно меньше людей, чем летом. Выходные июля-августа крайне переполнены жителями Стамбула. Зимний визит атмосферен, но большинство пляжных ресторанов закрыто." },
  { q: "Можно ли купаться на Принцевых островах?", a: "Да — на Бююкаде есть пляжи Yörükali и Nakibey (платный вход, лежаки). На Хейбелиаде — Değirmenburnu и Yelken Klübü. Большинство публичных пляжей открыты с середины мая до середины октября. Температура воды в июле-августе ~22-24°C." },
  { q: "Есть ли частная яхта из Стамбула на Принцевы острова?", a: "Да — MerrySails предлагает частные дневные чартеры из марины Кёручешме или Кабаташ. Типичный день яхты на Принцевых островах — 6-8 часов от €280 до 8 гостей (пакет Essential), с остановками на Бююкаде, Хейбелиаде и в Вашей бухте для купания. Большие яхты для групп до 150 человек." },
];

const pageSchema = {
  "@context": "https://schema.org", "@type": "TouristAttraction",
  name: "Тур на Принцевы острова из Стамбула",
  description: "Два способа посетить Принцевы острова из Стамбула: общий гид-тур на пароме €45 или частная яхта от €280. Бююкада, Хейбелиада, Бургазада и Кыналыада — архипелаг без машин в Стамбуле.",
  url: canonicalUrl, image: `${SITE_URL}/og-image.jpg`,
  isAccessibleForFree: false, publicAccess: true,
  touristType: ["Пары", "Семьи", "Одиночные путешественники", "Группы"],
  hasMap: "https://www.google.com/maps?q=Принцевы+острова+Стамбул",
  containsPlace: ISLANDS.map((i) => ({ "@type": "TouristAttraction", name: i.name })),
};
const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  speakable: { "@type": "SpeakableSpecification", cssSelector: [".faq-q", ".faq-a"] },
};
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Тур на Принцевы острова из Стамбула", item: canonicalUrl },
  ],
};

const WHATSAPP_PREFILL = "Здравствуйте, MerrySails — Планирую день на Принцевых островах. Дата: [дата], гостей: [N]. Общий тур или частная яхта?";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale as SiteLocale) || locale !== "ru") notFound();
  return (
    <main className="bg-[var(--bg)] text-[var(--body-text)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b border-[var(--line)] bg-gradient-to-b from-[var(--accent-soft,#f5f0e6)] to-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--text-muted)] mb-4">
            <Link href="/ru" className="hover:underline">Главная</Link><span className="mx-2">/</span>
            <span>Тур на Принцевы острова</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--heading)] mb-3">Тур на Принцевы острова из Стамбула — Гид 2026</h1>
          <p className="text-base sm:text-lg text-[var(--body-text)] max-w-3xl">
            <strong>Кратко.</strong> Два способа посетить безмашинные Принцевы острова Стамбула: общий тур на пароме за <strong>€45/чел.</strong> (8 часов, обед + гид) или частная яхта от <strong>€280</strong> до 8 гостей (гибкий день 6-8 часов, Вы выбираете острова и бухты). Четыре обитаемых острова — Бююкада, Хейбелиада, Бургазада, Кыналыада — без частных машин, только велосипеды, электрические шаттлы и пешеходные дорожки.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/cruises/istanbul-princes-island-tour" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">Общий тур от €45 <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/ru/yacht-charter-istanbul" className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand)]/5 transition">Частная яхта от €280 <ArrowRight className="w-4 h-4" /></Link>
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition">WhatsApp +90 544 898 98 12</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Общий паром vs частная яхта</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2"><Ship className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-wide">Общий тур полного дня</span></div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">€45 с человека</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>8 часов · отправление 09:00</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>До 50 гостей · одинокие и пары</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Общественный паром → Бююкада → прогулка с гидом → обед</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Обед + паром + гид включены</span></li>
            </ul>
            <Link href="/cruises/istanbul-princes-island-tour" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">Детали общего тура <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="rounded-2xl border border-[var(--brand)]/30 bg-[var(--brand)]/5 p-5">
            <div className="flex items-center gap-2 text-[var(--brand)] mb-2"><Anchor className="w-5 h-5" /><span className="text-xs font-bold uppercase tracking-wide">Частная яхта</span></div>
            <h3 className="text-xl font-bold text-[var(--heading)] mb-2">От €280 / яхта</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><Clock className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>6-8 часов гибко · Вы выбираете время</span></li>
              <li className="flex gap-2"><Users className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>2-150 гостей (Essential на 8)</span></li>
              <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Ваш маршрут — Бююкада, Хейбелиада, бухты</span></li>
              <li className="flex gap-2"><Trees className="w-4 h-4 mt-0.5 text-[var(--text-muted)]" /><span>Капитан + экипаж включены, кейтеринг опционально</span></li>
            </ul>
            <Link href="/ru/yacht-charter-istanbul" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--brand)] hover:underline">Смотреть пакеты яхт <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2">Четыре обитаемых Принцевых острова</h2>
          <p className="text-sm text-[var(--text-muted)] mb-6">Всего девять островов в архипелаге — четыре обитаемых и доступных на общественном пароме. Паромы заходят на все четыре по фиксированному маршруту от Кабаташ и Кадыкёй.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ISLANDS.map((island) => (
              <div key={island.name} className="rounded-2xl border border-[var(--line)] bg-white p-5">
                <h3 className="text-lg font-bold text-[var(--heading)] mb-1">{island.name}</h3>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-2">{island.sizeLabel}</p>
                <p className="text-sm text-[var(--body-text)]">{island.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">Как добраться из Стамбула на Принцевы острова</h2>
        <div className="space-y-4 text-sm leading-relaxed">
          <p><strong>Общественный паром Şehir Hatları от Кабаташ (европейская сторона):</strong> самый распространённый маршрут. Около 75-90 минут до Бююкады, с остановками в Кыналыаде, Бургазаде и Хейбелиаде. Паромы каждые 1-2 часа; первый ~06:50, последний обратно с Бююкады ~21:30. Билет в один конец ~₺40 с Istanbulkart.</p>
          <p><strong>Общественный паром от Кадыкёй или Бостанджы (азиатская сторона):</strong> быстрее — Бостанджы до Бююкады около 30 минут. Удобно, если отель уже на азиатской стороне.</p>
          <p><strong>İDO морской автобус (deniz otobüsü):</strong> более быстрый катамаран от Кабаташ и Бостанджы, до Бююкады около 45 минут. Чуть дороже (~₺70). Реже, чем общественный паром.</p>
          <p><strong>Частная яхта из марины Кёручешме или Кабаташ:</strong> 60-75 минут до Бююкады в зависимости от яхты. От двери до двери — без очередей на паром, без фиксированного расписания возврата, маршрут Ваш. MerrySails организует марину и капитана.</p>
        </div>
      </section>

      <section className="bg-[var(--accent-soft,#f7f4ec)] border-y border-[var(--line)]">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6">Вопросы и ответы — Тур на Принцевы острова Стамбул</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-[var(--line)] bg-white p-5">
                <summary className="faq-q cursor-pointer text-base font-semibold text-[var(--heading)] list-none flex items-start justify-between gap-3">
                  <span>{item.q}</span><span className="text-[var(--brand)] group-open:rotate-180 transition shrink-0">▼</span>
                </summary>
                <p className="faq-a mt-3 text-sm leading-relaxed text-[var(--body-text)]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-dark,#0a3e6f)] p-8 sm:p-10 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Запланируйте день на Принцевых островах</h2>
          <p className="text-sm sm:text-base opacity-90 mb-5 max-w-2xl">Отправьте дату и размер группы в WhatsApp — мы подтвердим доступность общего тура или пришлём смету на частную яхту на тот же день, обычно за несколько минут. Лицензия TÜRSAB Группы А (#{TURSAB_LICENSE_NUMBER}) · более 50 000 гостей с 2001 года.</p>
          <div className="flex flex-wrap gap-3">
            <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)] hover:brightness-105 transition">Написать в WhatsApp</a>
            <Link href="/ru/bosphorus-cruise" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">Опции круизов по Босфору <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
