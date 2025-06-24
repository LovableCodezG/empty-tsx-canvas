
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TransportOptionCardProps {
  id: string;
  icon: string;
  title: string;
  subtext: string;
  isSelected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const TransportOptionCard = ({
  id,
  icon,
  title,
  subtext,
  isSelected,
  onClick,
  children
}: TransportOptionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02]",
        isSelected
          ? "border-spot-primary bg-green-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300"
      )}
      onClick={onClick}
      id={id}
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold mb-2",
            isSelected ? "text-spot-primary" : "text-gray-900"
          )}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {subtext}
          </p>
          {isSelected && children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TransportOptionCard;
