
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TripNavigationButtonsProps {
  showBack?: boolean;
  onBack?: () => void;
  backText?: string;
  nextText: string;
  onNext: () => void;
  canProceed?: boolean;
  nextDisabled?: boolean;
}

const TripNavigationButtons = ({
  showBack = false,
  onBack,
  backText = "← Back",
  nextText,
  onNext,
  canProceed = true,
  nextDisabled = false
}: TripNavigationButtonsProps) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-20 flex justify-between items-end">
      {/* Back Button */}
      {showBack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            onClick={onBack}
            size="lg"
            variant="outline"
            className={cn(
              "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
              "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            )}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {backText}
          </Button>
        </motion.div>
      )}

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className={showBack ? '' : 'ml-auto'}
      >
        <Button
          onClick={onNext}
          disabled={nextDisabled || !canProceed}
          size="lg"
          className={cn(
            "h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
            canProceed && !nextDisabled
              ? "bg-spot-primary hover:bg-spot-primary/90 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          {nextText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default TripNavigationButtons;
