
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { Button } from '@/components/ui/button';
import { Share, Edit, CheckCircle } from 'lucide-react';

const OverviewHeader = ({ onShareClick, onEditClick, onFinishClick, canFinish = true }: {
  onShareClick: () => void;
  onEditClick: () => void;
  onFinishClick: () => void;
  canFinish?: boolean;
}) => {
  const { state } = useTripCreation();

  // Convert group members to animated tooltip format
  const tooltipMembers = state.groupMembers.map((member, index) => ({
    id: index + 1,
    name: member.name,
    designation: 'Trip Member',
    image: `https://images.unsplash.com/photo-${1599566150163 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`
  }));

  return (
    <motion.div
      id="trip-header"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Your Trip is Ready!
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
        Here's a complete summary of your trip. Review, adjust, or share before you go!
      </p>

      {/* Group Member Avatars */}
      {state.tripType === 'group' && state.groupMembers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <AnimatedTooltip items={tooltipMembers} />
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button
          id="scroll-to-share-button"
          variant="outline"
          onClick={onShareClick}
          className="flex items-center gap-2"
        >
          <Share className="h-4 w-4" />
          Share Trip
        </Button>
        
        <Button
          id="edit-trip-button"
          variant="outline"
          onClick={onEditClick}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit Trip
        </Button>
        
        <Button
          id="finish-trip-button"
          onClick={onFinishClick}
          disabled={!canFinish}
          className="flex items-center gap-2 bg-spot-primary hover:bg-spot-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="h-4 w-4" />
          Finish & Go to Dashboard
        </Button>
      </div>

      {!canFinish && (
        <p className="text-sm text-red-600 mt-2">
          Please provide a trip name to continue
        </p>
      )}

      {/* Bolt injection comment */}
      {/* Bolt injects trip metadata + trip type here (Group/Solo) */}
      {/* Share button scrolls to share section, NOT premium gated */}
    </motion.div>
  );
};

export default OverviewHeader;
