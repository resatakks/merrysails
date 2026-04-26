"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { handleTrackedContactNavigation } from "@/lib/analytics";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const hasStickyBookingUi =
    pathname.startsWith("/cruises/") ||
    pathname === "/istanbul-dinner-cruise" ||
    pathname === "/yacht-charter-istanbul";
  const mobileBottomOffset = hasStickyBookingUi
    ? "bottom-[calc(env(safe-area-inset-bottom)+5.75rem)]"
    : "bottom-[calc(env(safe-area-inset-bottom)+1rem)]";
  const desktopBottomOffset = hasStickyBookingUi ? "md:bottom-24" : "md:bottom-6";

  return (
    <>
      <a
        href={`tel:${PHONE}`}
        onClick={(event) =>
          handleTrackedContactNavigation(event, {
            href: `tel:${PHONE}`,
            kind: "phone",
            label: PHONE_DISPLAY,
            location: pathname,
          })
        }
        className={`fixed left-4 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(135deg,#182987,#ff0844)] px-3.5 py-2.5 text-white shadow-[0_18px_32px_rgba(24,41,135,0.34)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_22px_38px_rgba(24,41,135,0.44)] ${mobileBottomOffset} ${desktopBottomOffset} md:left-6 md:px-4`}
        aria-label={`Call ${PHONE_DISPLAY}`}
      >
        <Phone className="h-4 w-4 text-white md:h-5 md:w-5" />
        <span className="text-xs font-semibold text-white md:text-sm">Call</span>
      </a>
      <div
        className={`fixed right-4 z-40 flex flex-col items-end gap-2 ${mobileBottomOffset} ${desktopBottomOffset} md:right-6`}
      >
        <div className="hidden animate-bounce-gentle rounded-full border border-gray-100 bg-white/96 px-3 py-1.5 text-[11px] font-semibold text-gray-800 shadow-lg backdrop-blur-sm sm:block">
          7/24 Help
        </div>
        <a
          href={`${WHATSAPP_URL}?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20Bosphorus%20cruise%20tours.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) =>
            handleTrackedContactNavigation(event, {
              href: `${WHATSAPP_URL}?text=Hello%2C%20I%E2%80%99m%20interested%20in%20your%20Bosphorus%20cruise%20tours.`,
              kind: "whatsapp",
              label: "sticky_whatsapp_button",
              location: pathname,
            })
          }
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] md:h-14 md:w-14"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 animate-[wa-ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <svg viewBox="0 0 24 24" className="relative z-10 h-6 w-6 fill-white md:h-7 md:w-7" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
  );
}
