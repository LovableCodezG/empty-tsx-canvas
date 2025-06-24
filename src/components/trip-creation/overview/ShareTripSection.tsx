
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Share, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShareTripSection = () => {
  const { state } = useTripCreation();
  const { toast } = useToast();
  const [shareableLink] = useState(`https://spotplan.com/trip/${Date.now()}`);
  const [accessPassword] = useState(`spot${Math.random().toString(36).slice(2, 8)}`);

  const shareableText = `Join my trip on SpotPlan!

🌍 Trip Details:
${state.destinationType === 'international' ? state.selectedCountry : 'Domestic Trip'}
${state.dateType === 'single' 
  ? `📅 Date: ${state.startDate?.toLocaleDateString()}` 
  : `📅 Dates: ${state.dateRange?.from?.toLocaleDateString()} - ${state.dateRange?.to?.toLocaleDateString()}`
}

🔗 Link: ${shareableLink}
🔐 Password: ${accessPassword}

Click the link above and enter the password to view and collaborate on this trip!`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableText);
      toast({
        title: "Copied!",
        description: "Trip invitation copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card id="trip-share-access">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share This Trip
          </CardTitle>
          <p className="text-sm text-gray-600">
            Copy the invitation below to share with others. They can view and edit this trip.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Shareable Invitation Text */}
            <div className="space-y-2">
              <Textarea
                value={shareableText}
                readOnly
                className="min-h-[160px] bg-gray-50 font-mono text-sm resize-none"
              />
              <Button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Trip Invitation
              </Button>
            </div>

            {/* Collaboration Info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Collaborative Features
              </p>
              <p className="text-sm text-blue-700">
                Members can edit schedule and cost details collaboratively.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShareTripSection;
