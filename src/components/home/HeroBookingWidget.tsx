"use client";

import { motion } from "framer-motion";
import CoreBookingPlanner from "@/components/booking/CoreBookingPlanner";

export default function HeroBookingWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-20 w-full"
    >
      <CoreBookingPlanner variant="hero" source="hero" />
    </motion.div>
  );
}
