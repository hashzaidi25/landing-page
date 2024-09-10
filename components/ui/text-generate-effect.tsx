"use client";

import { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  words: string;
}

export function TextGenerateEffect({ words }: TextGenerateEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Adjust the speed of text generation here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return <span>{displayedText}</span>;
}
