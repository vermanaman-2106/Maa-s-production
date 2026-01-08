"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 0.01, 0.16, 0.99] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.35,
      ease: [0.33, 0.01, 0.16, 0.99] as [number, number, number, number],
    },
  },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="mp-fade-in"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}



