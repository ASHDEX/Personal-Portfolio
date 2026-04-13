"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BootLine = {
  text: string;
  delay: number;
  colorClass?: string;
};

const bootLines: BootLine[] = [
  { text: "[BIOS] POST check ........................ OK", delay: 80 },
  { text: "[SYS]  Loading sec-ops-terminal v3.0 ..... OK", delay: 120 },
  { text: "[AUTH] Operator: jayesh_choudhary ......... VERIFIED", delay: 100 },
  { text: "[CRED] CISSP · CISM · CISA · CASP+ ....... 16 ACTIVE", delay: 140 },
  { text: "[MOD]  Loading EXEC_LOGS .................. OK", delay: 80 },
  { text: "[MOD]  Loading CAPABILITY_MATRIX .......... OK", delay: 60 },
  { text: "[MOD]  Loading DEPLOYED_SYSTEMS ........... OK", delay: 80 },
  { text: "[MOD]  Loading CREDENTIAL_STORE ........... OK", delay: 60 },
  { text: "[MOD]  Loading COMMS_INTERFACE ............ OK", delay: 80 },
  { text: "[NET]  Secure channel established ......... ENCRYPTED", delay: 120 },
  { text: "─────────────────────────────────────────", delay: 40, colorClass: "text-[#6e7a88]" },
  { text: "[READY] All systems operational. Welcome.", delay: 200, colorClass: "text-[#00ff9c]" },
];

interface BootSequenceProps {
  onComplete?: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const totalDelay = bootLines.reduce((acc, line) => acc + line.delay, 0) + 400; // plus final pause

  useEffect(() => {
    let cumulativeDelay = 0;
    bootLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        // Update progress
        const newProgress = ((index + 1) / bootLines.length) * 100;
        setProgress(newProgress);
      }, cumulativeDelay);
      cumulativeDelay += line.delay;
      timeoutRefs.current.push(timeout);
    });

    // After last line, wait 400ms then hide
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, cumulativeDelay + 400);

    timeoutRefs.current.push(hideTimeout);

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-[#0a0e14] flex flex-col items-center justify-center"
        >
          <div className="font-mono text-[13px] w-[400px] max-w-[90vw]">
            {bootLines.map((line, index) => (
              <div
                key={index}
                className={`transition-opacity duration-150 ${
                  visibleLines.includes(index) ? "opacity-100" : "opacity-0"
                } ${line.colorClass || ""} ${
                  line.text.includes("OK") || 
                  line.text.includes("VERIFIED") || 
                  line.text.includes("ACTIVE") || 
                  line.text.includes("ENCRYPTED")
                    ? "text-[#00ff9c]"
                    : ""
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-[400px] max-w-[90vw] h-[3px] bg-[#1b2430] mt-5 overflow-hidden">
            <motion.div
              className="h-full bg-[#00ff9c] shadow-[0_0_12px_#00ff9c]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}