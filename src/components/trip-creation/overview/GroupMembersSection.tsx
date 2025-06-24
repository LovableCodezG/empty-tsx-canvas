
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users } from 'lucide-react';

const GroupMembersSection = () => {
  const { state } = useTripCreation();

  // Only render for group trips
  if (state.tripType !== 'group' || state.groupMembers.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <Card id="group-members">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Group Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.groupMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="member-avatar-card flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={`https://images.unsplash.com/photo-${1599566150163 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} 
                    alt={member.name} 
                  />
                  <AvatarFallback>
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{member.name}</p>
                  <p className="text-sm text-gray-500 truncate">{member.email}</p>
                  <p className="text-xs text-blue-600">Trip Member</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-sm text-blue-600 mt-4">
            Display only if trip type = group
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GroupMembersSection;
