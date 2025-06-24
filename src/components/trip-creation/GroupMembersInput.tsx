import React, { useEffect } from 'react';
import { Users, Mail, User, Plus, Trash2 } from 'lucide-react';
import { useTripCreation, GroupMember } from '@/contexts/TripCreationContext';
import { Button } from '@/components/ui/button';

const GroupMembersInput = () => {
  const { state, dispatch } = useTripCreation();

  if (state.tripType !== 'group') {
    return null;
  }

  // Generate initial members when group size changes
  useEffect(() => {
    const currentMemberCount = state.groupMembers.length;
    const targetSize = state.groupSize;

    if (currentMemberCount !== targetSize) {
      const newMembers: GroupMember[] = [];
      
      // Keep existing members
      for (let i = 0; i < Math.min(currentMemberCount, targetSize); i++) {
        newMembers.push(state.groupMembers[i]);
      }
      
      // Add new empty members if needed
      for (let i = currentMemberCount; i < targetSize; i++) {
        newMembers.push({
          id: `member-${i + 1}`,
          name: '',
          email: ''
        });
      }
      
      dispatch({ type: 'SET_GROUP_MEMBERS', payload: newMembers });
    }
  }, [state.groupSize, state.groupMembers.length, dispatch]);

  const updateMember = (index: number, field: 'name' | 'email', value: string) => {
    const updatedMembers = [...state.groupMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    dispatch({ type: 'SET_GROUP_MEMBERS', payload: updatedMembers });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-spot-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Group Members</h3>
      </div>

      <div className="space-y-3">
        {state.groupMembers.map((member, index) => (
          <div 
            key={member.id} 
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Member {index + 1}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full name"
                  value={member.name}
                  onChange={(e) => updateMember(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  value={member.email}
                  onChange={(e) => updateMember(index, 'email', e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spot-primary focus:border-transparent"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMembersInput;
