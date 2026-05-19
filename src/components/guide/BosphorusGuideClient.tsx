"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Volume2,
  Square,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
} from "lucide-react";
import {
  BOSPHORUS_LANDMARKS,
  GUIDE_LANGUAGES,
  type GuideLangCode,
  type Landmark,
} from "@/data/bosphorus-guide";

// Leaflet map is browser-only — load it client-side after hydration.
const BosphorusMap = dynamic(() => import("./BosphorusMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] w-full items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] text-sm font-medium text-[var(--text-muted)]">
      Loading map…
    </div>
  ),
});

type Props = {
  ctaHref?: string;
};

type UIStrings = {
  tap: string;
  lookFor: string;
  listen: string;
  stop: string;
  prev: string;
  next: string;
  europe: string;
  asia: string;
  strait: string;
  cta: string;
  audioLang: string;
  locate: string;
};

const UI: Record<GuideLangCode, UIStrings> = {
  en: { tap: "Tap a landmark on the map", lookFor: "What to look for", listen: "Listen to this landmark", stop: "Stop audio guide", prev: "Previous", next: "Next", europe: "European shore", asia: "Asian shore", strait: "Mid-strait", cta: "Book the Bosphorus sunset cruise", audioLang: "Guide language", locate: "My location" },
  tr: { tap: "Haritada bir noktaya dokun", lookFor: "Nereye bakmalı", listen: "Bu noktayı dinle", stop: "Sesli rehberi durdur", prev: "Önceki", next: "Sonraki", europe: "Avrupa yakası", asia: "Anadolu yakası", strait: "Boğazın ortası", cta: "Boğaz gün batımı turunu ayırt", audioLang: "Rehber dili", locate: "Konumum" },
  de: { tap: "Tippen Sie auf einen Punkt auf der Karte", lookFor: "Worauf zu achten ist", listen: "Dieses Wahrzeichen anhören", stop: "Audioguide stoppen", prev: "Zurück", next: "Weiter", europe: "Europäisches Ufer", asia: "Asiatisches Ufer", strait: "Mitte der Meerenge", cta: "Bosporus-Sonnenuntergangsfahrt buchen", audioLang: "Sprache des Guides", locate: "Mein Standort" },
  fr: { tap: "Touchez un point sur la carte", lookFor: "Ce qu'il faut regarder", listen: "Écouter ce site", stop: "Arrêter l'audioguide", prev: "Précédent", next: "Suivant", europe: "Rive européenne", asia: "Rive asiatique", strait: "Milieu du détroit", cta: "Réserver la croisière au coucher du soleil", audioLang: "Langue du guide", locate: "Ma position" },
  es: { tap: "Toca un punto en el mapa", lookFor: "Qué buscar", listen: "Escuchar este lugar", stop: "Detener la audioguía", prev: "Anterior", next: "Siguiente", europe: "Orilla europea", asia: "Orilla asiática", strait: "Centro del estrecho", cta: "Reservar el crucero al atardecer", audioLang: "Idioma de la guía", locate: "Mi ubicación" },
  ru: { tap: "Коснитесь точки на карте", lookFor: "На что смотреть", listen: "Прослушать этот объект", stop: "Остановить аудиогид", prev: "Назад", next: "Далее", europe: "Европейский берег", asia: "Азиатский берег", strait: "Середина пролива", cta: "Забронировать закатный круиз", audioLang: "Язык гида", locate: "Моё место" },
  it: { tap: "Tocca un punto sulla mappa", lookFor: "Cosa cercare", listen: "Ascolta questo luogo", stop: "Ferma l'audioguida", prev: "Precedente", next: "Successivo", europe: "Sponda europea", asia: "Sponda asiatica", strait: "Centro dello stretto", cta: "Prenota la crociera al tramonto", audioLang: "Lingua della guida", locate: "La mia posizione" },
  nl: { tap: "Tik op een punt op de kaart", lookFor: "Waar te kijken", listen: "Beluister deze plek", stop: "Audiogids stoppen", prev: "Vorige", next: "Volgende", europe: "Europese oever", asia: "Aziatische oever", strait: "Midden van de zeestraat", cta: "Boek de zonsondergangcruise", audioLang: "Taal van de gids", locate: "Mijn locatie" },
  ar: { tap: "اضغط على نقطة على الخريطة", lookFor: "ما الذي تبحث عنه", listen: "استمع إلى هذا المعلم", stop: "إيقاف الدليل الصوتي", prev: "السابق", next: "التالي", europe: "الضفة الأوروبية", asia: "الضفة الآسيوية", strait: "وسط المضيق", cta: "احجز رحلة الغروب", audioLang: "لغة الدليل", locate: "موقعي" },
  ja: { tap: "地図上の地点をタップ", lookFor: "見どころ", listen: "この名所を聴く", stop: "音声ガイドを停止", prev: "前へ", next: "次へ", europe: "ヨーロッパ岸", asia: "アジア岸", strait: "海峡の中央", cta: "夕陽クルーズを予約", audioLang: "ガイドの言語", locate: "現在地" },
  zh: { tap: "点按地图上的地点", lookFor: "看点", listen: "收听此景点", stop: "停止语音导览", prev: "上一个", next: "下一个", europe: "欧洲岸", asia: "亚洲岸", strait: "海峡中央", cta: "预订日落游船", audioLang: "导览语言", locate: "我的位置" },
  pt: { tap: "Toque num ponto no mapa", lookFor: "O que observar", listen: "Ouvir este local", stop: "Parar o audioguia", prev: "Anterior", next: "Seguinte", europe: "Margem europeia", asia: "Margem asiática", strait: "Centro do estreito", cta: "Reservar o cruzeiro ao pôr do sol", audioLang: "Idioma do guia", locate: "Minha localização" },
};

const SIDE_STYLES: Record<Landmark["side"], string> = {
  Europe: "bg-rose-100 text-rose-700",
  Asia: "bg-sky-100 text-sky-700",
  Strait: "bg-amber-100 text-amber-700",
};

/**
 * Landmark photo for the detail panel. Looks for /images/guide/<id>.webp and
 * hides itself if the file is not present, so the panel never shows a broken image.
 */
function LandmarkImage({ id, alt }: { id: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-[var(--line)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/guide/${id}.webp`}
        alt={alt}
        loading="lazy"
        onError={() => setOk(false)}
        className="h-48 w-full object-cover"
      />
    </div>
  );
}

export default function BosphorusGuideClient({
  ctaHref = "/cruises/bosphorus-sunset-cruise",
}: Props) {
  const [activeId, setActiveId] = useState(BOSPHORUS_LANDMARKS[0].id);
  const [lang, setLang] = useState<GuideLangCode>("en");
  const [speaking, setSpeaking] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = BOSPHORUS_LANDMARKS.findIndex((l) => l.id === activeId);
  const active = BOSPHORUS_LANDMARKS[activeIndex];
  const t = active.text[lang] ?? active.text.en;
  const ui = UI[lang];
  const langMeta = GUIDE_LANGUAGES.find((g) => g.code === lang);
  const isRtl = Boolean(langMeta?.rtl);

  useEffect(() => {
    setCanSpeak(typeof window !== "undefined" && "speechSynthesis" in window);
    // Deep-link: open directly on a landmark via /bosphorus-guide#landmark-id
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && BOSPHORUS_LANDMARKS.some((l) => l.id === hash)) {
      setActiveId(hash);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop narration when the landmark or language changes
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, [activeId, lang]);

  const narration = useMemo(
    () => `${t.name}. ${t.summary} ${ui.lookFor}: ${t.lookFor}`,
    [t, ui]
  );

  const toggleSpeak = () => {
    if (!canSpeak) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = langMeta?.bcp47 ?? "en-US";
    const voice = synth
      .getVoices()
      .find((v) => v.lang.toLowerCase().startsWith(lang));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.98;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    synth.speak(utterance);
    setSpeaking(true);
  };

  const select = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const go = (dir: -1 | 1) => {
    const next =
      (activeIndex + dir + BOSPHORUS_LANDMARKS.length) %
      BOSPHORUS_LANDMARKS.length;
    select(BOSPHORUS_LANDMARKS[next].id);
  };

  return (
    <div className="space-y-4">
      {/* Language selector — 12 languages */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--line)] bg-white p-3">
        <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {ui.audioLang}
        </span>
        {GUIDE_LANGUAGES.map((g) => (
          <button
            key={g.code}
            type="button"
            onClick={() => setLang(g.code)}
            aria-pressed={g.code === lang}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              g.code === lang
                ? "bg-[var(--brand-primary)] text-white"
                : "border border-[var(--line)] bg-white text-[var(--heading)] hover:border-[var(--brand-primary)]"
            }`}
          >
            <span aria-hidden>{g.flag}</span>
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Interactive strait map */}
        <div className="rounded-2xl border border-[var(--line)] bg-white p-4 md:p-5">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <Compass className="h-4 w-4 text-[var(--brand-primary)]" />
            {ui.tap}
          </div>
          <BosphorusMap
            activeId={activeId}
            lang={lang}
            onSelect={select}
            locateLabel={ui.locate}
          />

          <ol className="mt-4 grid gap-1.5 sm:grid-cols-2">
            {BOSPHORUS_LANDMARKS.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => select(l.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors ${
                    l.id === activeId
                      ? "bg-[var(--brand-primary)]/10 font-semibold text-[var(--brand-primary)]"
                      : "text-[var(--body-text)] hover:bg-[var(--surface-alt)]"
                  }`}
                >
                  <span className="text-[11px] font-bold text-[var(--text-muted)]">
                    {i + 1}
                  </span>
                  <span className="truncate">{(l.text[lang] ?? l.text.en).name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Detail panel */}
        <div
          ref={detailRef}
          dir={isRtl ? "rtl" : "ltr"}
          className="flex flex-col rounded-2xl border border-[var(--line)] bg-white p-6 md:p-7 scroll-mt-24"
        >
          <LandmarkImage key={active.id} id={active.id} alt={t.name} />

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${SIDE_STYLES[active.side]}`}
            >
              {active.side === "Europe"
                ? ui.europe
                : active.side === "Asia"
                ? ui.asia
                : ui.strait}
            </span>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              {active.category} · {active.era}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-[var(--heading)]">
            {t.name}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[var(--body-text)]">
            {t.summary}
          </p>

          <div className="mt-4 flex gap-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-alt)] p-4">
            <Eye className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {ui.lookFor}
              </div>
              <p className="mt-1 text-sm leading-snug text-[var(--body-text)]">
                {t.lookFor}
              </p>
            </div>
          </div>

          {canSpeak && (
            <button
              type="button"
              onClick={toggleSpeak}
              className={`mt-4 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                speaking
                  ? "bg-[var(--heading)] text-white"
                  : "bg-[var(--brand-primary)] text-white hover:opacity-90"
              }`}
            >
              {speaking ? (
                <>
                  <Square className="h-4 w-4" /> {ui.stop}
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" /> {ui.listen}
                </>
              )}
            </button>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              <ChevronLeft className="h-4 w-4" /> {ui.prev}
            </button>
            <span className="text-xs font-medium text-[var(--text-muted)]">
              {activeIndex + 1} / {BOSPHORUS_LANDMARKS.length}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
            >
              {ui.next} <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold !text-white transition-opacity hover:opacity-90"
          >
            {ui.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
