"use client";

import { motion } from "motion/react";
import { memo } from "react";

export const RevealSection = memo(function RevealSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="snap-start scroll-mt-24"
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
});
