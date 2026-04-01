"use client";

import { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    const progressBar = progressRef.current;
    if (!progressBar || !lenis) return;

    const updateProgress = () => {
      const scrollProgress = lenis.progress || 0;
      progressBar.style.transform = `scaleX(${scrollProgress})`;
    };

    lenis.on("scroll", updateProgress);

    return () => {
      lenis.off("scroll", updateProgress);
    };
  }, [lenis]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        ref={progressRef}
        className="scroll-progress-bar"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
