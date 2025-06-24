
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
  defaultSelected?: number | null;
  theme?: "light" | "dark";
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor,
  onChange,
  defaultSelected = null,
  theme = "light",
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(defaultSelected);
  const outsideClickRef = React.useRef(null);

  // Update selected state when defaultSelected changes
  React.useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  const isDark = theme === "dark";
  
  // Set default active color based on theme if not provided
  const defaultActiveColor = isDark ? "text-white" : "text-blue-600";
  const finalActiveColor = activeColor || defaultActiveColor;

  const Separator = () => (
    <div 
      className={cn(
        "mx-1 h-[24px] w-[1.2px]",
        isDark ? "bg-white/30" : "bg-gray-300"
      )} 
      aria-hidden="true" 
    />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border p-1 shadow-sm",
        isDark 
          ? "border-white/20 bg-black/30 backdrop-blur-sm" 
          : "border-gray-200 bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        // Type assertion to ensure TypeScript knows this is a Tab, not a Separator
        const tabItem = tab as Tab;
        const Icon = tabItem.icon;
        
        return (
          <motion.button
            key={tabItem.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn(
                    isDark ? "bg-white/20 backdrop-blur-sm" : "bg-blue-100/80",
                    finalActiveColor
                  )
                : isDark 
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tabItem.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
