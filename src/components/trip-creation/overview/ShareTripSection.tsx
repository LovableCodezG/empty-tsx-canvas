
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share, Copy, Link, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShareTripSection = () => {
  const { state } = useTripCreation();
  const { toast } = useToast();
  const [shareableLink] = useState(`https://spotplan.com/trip/${Date.now()}`);
  const [accessPassword] = useState(`spot${Math.random().toString(36).slice(2, 8)}`);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
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
            Anyone with access can view or edit this trip using the link and password.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Shareable Link */}
            <div className="space-y-2">
              <Label htmlFor="shareable-trip-link" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                Shareable Link
              </Label>
              <div className="flex gap-2">
                <Input
                  id="shareable-trip-link"
                  value={shareableLink}
                  readOnly
                  className="flex-1 bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(shareableLink, 'Trip link')}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Access Password */}
            <div className="space-y-2">
              <Label htmlFor="trip-access-password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Access Password
              </Label>
              <div className="flex gap-2">
                <Input
                  id="trip-access-password"
                  value={accessPassword}
                  readOnly
                  className="flex-1 bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(accessPassword, 'Access password')}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
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

            <div className="text-sm text-blue-600">
              This feature is NOT locked behind premium — available to all group users
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ShareTripSection;
