"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { LocateFixed, Loader2 } from "lucide-react";
import { BOSPHORUS_LANDMARKS, type GuideLangCode } from "@/data/bosphorus-guide";

type Props = {
  activeId: string;
  lang: GuideLangCode;
  onSelect: (id: string) => void;
  locateLabel: string;
};

const BOSPHORUS_CENTER: [number, number] = [41.058, 29.02];

function pinIcon(num: number, active: boolean): L.DivIcon {
  const color = active ? "#ff0844" : "#0f3d5e";
  const h = active ? 46 : 34;
  const w = h * 0.74;
  return L.divIcon({
    className: "",
    html: `<svg width="${w}" height="${h}" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,0.35))">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 9.6 14 24 14 24s14-14.4 14-24C28 6.27 21.73 0 14 0Z" fill="${color}"/>
      <circle cx="14" cy="14" r="8.6" fill="#ffffff"/>
      <text x="14" y="17.8" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="${color}">${num}</text>
    </svg>`,
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
  });
}

function userIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:50%;background:#2563eb;border:3px solid #fff;box-shadow:0 0 0 5px rgba(37,99,235,0.25)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function MapController({
  target,
  userPos,
}: {
  target: [number, number];
  userPos: [number, number] | null;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(target, Math.max(map.getZoom(), 14), { duration: 0.7 });
  }, [target, map]);
  useEffect(() => {
    if (userPos) map.flyTo(userPos, 14, { duration: 0.7 });
  }, [userPos, map]);
  return null;
}

export default function BosphorusMap({ activeId, lang, onSelect, locateLabel }: Props) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);

  const active =
    BOSPHORUS_LANDMARKS.find((l) => l.id === activeId) ?? BOSPHORUS_LANDMARKS[0];

  const locate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 30000 }
    );
  };

  // Ask for location as soon as the guide opens — this is a GPS guide.
  // If the visitor declines, the "My location" button stays available to retry.
  useEffect(() => {
    locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-[var(--line)]">
      <MapContainer
        center={BOSPHORUS_CENTER}
        zoom={12}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: "#aadaff" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {BOSPHORUS_LANDMARKS.map((l, i) => (
          <Marker
            key={`${l.id}-${l.id === activeId}`}
            position={[l.lat, l.lng]}
            icon={pinIcon(i + 1, l.id === activeId)}
            zIndexOffset={l.id === activeId ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(l.id) }}
          >
            <Tooltip direction="top" offset={[0, -30]}>
              {i + 1}. {l.text[lang].name}
            </Tooltip>
          </Marker>
        ))}
        {userPos && <Marker position={userPos} icon={userIcon()} />}
        <MapController target={[active.lat, active.lng]} userPos={userPos} />
      </MapContainer>

      <button
        type="button"
        onClick={locate}
        className="absolute right-3 top-3 z-[1000] inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[var(--heading)] shadow-md transition-colors hover:bg-[var(--surface-alt)]"
      >
        {locating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LocateFixed className="h-4 w-4 text-[var(--brand-primary)]" />
        )}
        {locateLabel}
      </button>
    </div>
  );
}
