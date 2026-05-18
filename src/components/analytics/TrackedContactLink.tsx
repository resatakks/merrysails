"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  handleTrackedContactNavigation,
  type ContactIntent,
} from "@/lib/analytics";

type ContactLinkKind = "phone" | "whatsapp";

interface TrackedContactLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  children: ReactNode;
  href: string;
  intent?: ContactIntent;
  kind: ContactLinkKind;
  label: string;
  location: string;
}

export default function TrackedContactLink({
  children,
  href,
  intent,
  kind,
  label,
  location,
  onClick,
  ...rest
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      // Marks this anchor as already instrumented so the global delegated
      // contact-click listener (GlobalContactClickTracker) skips it — prevents
      // double-counting WhatsApp/phone conversion events.
      data-contact-tracked="1"
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        handleTrackedContactNavigation(event, {
          href,
          intent,
          kind,
          label,
          location,
        });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
