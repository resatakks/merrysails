"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function BestPriceBadge() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-6 left-24 z-40 hidden lg:block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip((v) => !v)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl bg-white shadow-xl border border-[var(--line)] text-xs text-[var(--body-text)] leading-relaxed"
          >
            <p className="font-semibold text-[var(--heading)] mb-1">
              Clear Online Pricing
            </p>
            <p>
              Review the published online rate before you book. If you need a custom setup, we quote it in advance.
            </p>
            {/* Tooltip arrow */}
            <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white border-b border-r border-[var(--line)] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white shadow-lg border border-[var(--brand-gold)]/30 cursor-pointer hover:shadow-xl transition-shadow select-none">
        <ShieldCheck className="w-4 h-4 text-[var(--brand-gold)]" />
        <span className="text-xs font-semibold text-[var(--heading)] whitespace-nowrap">
          Clear Online Pricing
        </span>
      </div>
    </motion.div>
  );
}
