"use client";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
    </motion.h1>


    </LampContainer>
  );
}
