"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
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

const BOSPHORUS_CENTER: [number, number] = [41.045, 29.005];

function pinIcon(id: string, active: boolean): L.DivIcon {
  // Each landmark has its own round badge icon at /images/guide/<id>-icon.svg
  const size = active ? 52 : 38;
  const ring = active
    ? "box-shadow:0 0 0 4px #ff0844,0 2px 6px rgba(0,0,0,0.45);"
    : "box-shadow:0 1px 5px rgba(0,0,0,0.4);";
  return L.divIcon({
    className: "",
    html: `<img src="/images/guide/${id}-icon.svg" alt="" style="width:${size}px;height:${size}px;display:block;border-radius:50%;${ring}transition:all .15s"/>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
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
  const first = useRef(true);
  useEffect(() => {
    // Keep the initial wide view that shows every landmark; only fly once the
    // visitor actually picks a landmark.
    if (first.current) {
      first.current = false;
      return;
    }
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
        zoom={11}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: "#aadaff" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {BOSPHORUS_LANDMARKS.map((l) => (
          <Marker
            key={`${l.id}-${l.id === activeId}`}
            position={[l.lat, l.lng]}
            icon={pinIcon(l.id, l.id === activeId)}
            zIndexOffset={l.id === activeId ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(l.id) }}
          >
            <Tooltip direction="top" offset={[0, -24]}>
              {(l.text[lang] ?? l.text.en).name}
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
