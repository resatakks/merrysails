"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ClarityIdentityProvider() {
  const pathname = usePathname();
  const consentSent = useRef(false);

  useEffect(() => {
    // Persistent visitor ID — localStorage-backed, survives SPA navigation
    let uid = "";
    try {
      const match = document.cookie.match(/(?:^|; )_craft_uid=([^;]*)/);
      if (match) uid = match[1];
    } catch (_) {}
    if (!uid) {
      try {
        uid = localStorage.getItem("_clarity_uid") || "";
      } catch (_) {}
    }
    if (!uid) {
      uid = crypto.randomUUID();
      try {
        localStorage.setItem("_clarity_uid", uid);
      } catch (_) {}
    }

    const identify = () => {
      const cl = (window as any).clarity;
      if (typeof cl !== "function") return;

      if (!consentSent.current) {
        try {
          cl("consentv2", { analytics_Storage: "granted", ad_Storage: "granted" });
          consentSent.current = true;
        } catch (_) {}
      }

      let name: string | undefined;
      try {
        name = localStorage.getItem("_user_name") || undefined;
      } catch (_) {}

      cl("identify", uid, undefined, pathname || "/", name);
      cl("set", "page_path", pathname);
    };

    identify();

    // Poll until Clarity runtime is loaded (async script)
    const isReady = () => {
      const cl = (window as any).clarity;
      return typeof cl === "function" && Boolean(cl.v);
    };

    if (isReady()) return;

    const interval = setInterval(() => {
      if (isReady()) {
        identify();
        clearInterval(interval);
        clearTimeout(timeout);
      }
    }, 1500);

    const timeout = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
