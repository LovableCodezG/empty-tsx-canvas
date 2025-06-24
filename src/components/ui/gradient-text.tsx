
"use client"
import React from "react";
import { motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface GradientTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

function GradientText({
  className,
  children,
  as: Component = "span",
  ...props
}: GradientTextProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={cn(
        "relative inline-block bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] bg-clip-text text-transparent animate-pulse",
        className,
      )}
      style={{
        backgroundSize: "200% 200%",
        animation: "gradient-shift 3s ease-in-out infinite alternate"
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export { GradientText }
