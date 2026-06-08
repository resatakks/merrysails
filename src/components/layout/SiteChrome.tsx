"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CampaignRibbon from "@/components/marketing/CampaignRibbon";
import { installGlobalWhatsAppListener } from "@/lib/analytics-whatsapp";

function isReservationDocumentRoute(pathname: string): boolean {
  return /^\/reservation\/[^/]+\/(invoice|voucher)$/.test(pathname);
}

export default function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const hideChrome =
    pathname.startsWith("/admin") || isReservationDocumentRoute(pathname);

  // Catch every wa.me click — including raw anchors that never wired up
  // onClick — so Clarity sees whatsapp_click_v2 instead of 0 events.
  useEffect(() => {
    installGlobalWhatsAppListener();
  }, []);

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <CampaignRibbon />
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBookingBar />
      <WhatsAppButton />
    </>
  );
}
