import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation, GroupMember } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, Plus, Edit2, Trash2, User, Mail } from 'lucide-react';

const GroupMembersSection = () => {
  const { state, dispatch } = useTripCreation();
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [addingMember, setAddingMember] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({ name: '', email: '' });

  // Only render for group trips
  if (state.tripType !== 'group') {
    return null;
  }

  const handleAddMember = () => {
    if (!newMemberForm.name.trim() || !newMemberForm.email.trim()) return;
    
    const newMember: GroupMember = {
      id: `member-${Date.now()}`,
      name: newMemberForm.name.trim(),
      email: newMemberForm.email.trim()
    };

    dispatch({
      type: 'SET_GROUP_MEMBERS',
      payload: [...state.groupMembers, newMember]
    });
    
    setNewMemberForm({ name: '', email: '' });
    setAddingMember(false);
  };

  const handleEditMember = (member: GroupMember) => {
    setEditingMember(member.id);
    setEditForm({ name: member.name, email: member.email });
  };

  const handleUpdateMember = () => {
    if (!editForm.name.trim() || !editForm.email.trim()) return;
    
    const updatedMembers = state.groupMembers.map(member =>
      member.id === editingMember
        ? { ...member, name: editForm.name.trim(), email: editForm.email.trim() }
        : member
    );
    
    dispatch({
      type: 'SET_GROUP_MEMBERS',
      payload: updatedMembers
    });
    
    setEditingMember(null);
    setEditForm({ name: '', email: '' });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = state.groupMembers.filter(member => member.id !== memberId);
    dispatch({
      type: 'SET_GROUP_MEMBERS',
      payload: updatedMembers
    });
  };

  const cancelEdit = () => {
    setEditingMember(null);
    setEditForm({ name: '', email: '' });
  };

  const cancelAdd = () => {
    setAddingMember(false);
    setNewMemberForm({ name: '', email: '' });
  };

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
            Group Members ({state.groupMembers.length}/{state.groupSize})
          </CardTitle>
          <p className="text-sm text-gray-600">
            Add and manage your trip members. They'll be able to view and edit this trip.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Existing Members or Empty State */}
            {state.groupMembers.length > 0 ? (
              <div className="space-y-3">
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
                    
                    {editingMember === member.id ? (
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="text-sm"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleUpdateMember}>Save</Button>
                          <Button size="sm" variant="outline" onClick={cancelEdit}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">{member.name}</p>
                          <p className="text-sm text-gray-500 truncate">{member.email}</p>
                          <p className="text-xs text-blue-600">Trip Member</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditMember(member)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">No group members added yet</p>
                <p className="text-sm">Add members to share and collaborate on this trip</p>
              </div>
            )}

            {/* Add New Member Form */}
            {addingMember ? (
              <div className="border rounded-lg p-4 bg-gray-50">
                <p className="font-medium text-gray-900 mb-3">Add New Member</p>
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      placeholder="Full name"
                      value={newMemberForm.name}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                      className="pr-10"
                    />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Email address"
                      type="email"
                      value={newMemberForm.email}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                      className="pr-10"
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddMember} size="sm">Add Member</Button>
                    <Button variant="outline" onClick={cancelAdd} size="sm">Cancel</Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setAddingMember(true)}
                variant="outline"
                className="w-full flex items-center gap-2"
                disabled={state.groupMembers.length >= state.groupSize}
              >
                <Plus className="h-4 w-4" />
                Add Group Member
              </Button>
            )}

            {state.groupMembers.length >= state.groupSize && (
              <p className="text-sm text-amber-600">
                You've reached the maximum group size of {state.groupSize} members.
              </p>
            )}

            <div className="text-sm text-blue-600 mt-4">
              Members can be added and managed here
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GroupMembersSection;
