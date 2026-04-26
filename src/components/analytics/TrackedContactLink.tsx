"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { handleTrackedContactNavigation } from "@/lib/analytics";

type ContactLinkKind = "phone" | "whatsapp";

interface TrackedContactLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  children: ReactNode;
  href: string;
  kind: ContactLinkKind;
  label: string;
  location: string;
}

export default function TrackedContactLink({
  children,
  href,
  kind,
  label,
  location,
  onClick,
  ...rest
}: TrackedContactLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        handleTrackedContactNavigation(event, {
          href,
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
