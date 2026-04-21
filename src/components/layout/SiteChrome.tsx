"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBookingBar from "@/components/layout/MobileBookingBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

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

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBookingBar />
      <WhatsAppButton />
    </>
  );
}
