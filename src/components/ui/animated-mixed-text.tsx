
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TextSegment = {
  text: string;
  className?: string;
};

type AnimatedMixedTextProps = {
  segments: TextSegment[];
  delay?: number;
  className?: string;
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
};

const AnimatedMixedText: React.FC<AnimatedMixedTextProps> = ({
  segments,
  delay = 80, // Reduced from 100 for faster animation
  className = "",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const wordVariants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? -20 : 20,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5 for faster animation
        ease: "easeOut",
      },
    },
  };

  // Split text into words while preserving segments and their classes
  const allWords: Array<{ word: string; className?: string }> = [];
  
  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((word, index) => {
      if (word.trim()) {
        allWords.push({ word: word.trim(), className: segment.className });
      }
    });
  });

  return (
    <motion.div
      ref={ref}
      className={`${className} flex flex-wrap justify-center`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {allWords.map((item, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={`inline-block mr-2 ${item.className || ""}`}
          style={{
            willChange: "transform, filter, opacity",
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export { AnimatedMixedText };
