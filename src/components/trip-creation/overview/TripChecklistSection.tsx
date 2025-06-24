
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, CheckSquare, Trash2, ListTodo } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TripChecklistSection = () => {
  const { state, dispatch } = useTripCreation();
  const [newTaskText, setNewTaskText] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);

  const checklist = state.checklistItems || [];

  const handleAddTask = () => {
    if (!newTaskText.trim()) return;
    
    if (checklist.length >= 5) {
      setShowLimitModal(true);
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false
    };

    dispatch({
      type: 'SET_CHECKLIST_ITEMS',
      payload: [...checklist, newTask]
    });
    setNewTaskText('');
  };

  const handleToggleTask = (taskId: string) => {
    const updatedChecklist = checklist.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    dispatch({
      type: 'SET_CHECKLIST_ITEMS',
      payload: updatedChecklist
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedChecklist = checklist.filter(task => task.id !== taskId);
    dispatch({
      type: 'SET_CHECKLIST_ITEMS',
      payload: updatedChecklist
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card id="trip-checklist">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Checklist Items or Empty State */}
            {checklist.length > 0 ? (
              <div className="space-y-3">
                {checklist.map((task) => (
                  <div key={task.id} className="checklist-item flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleTask(task.id)}
                    />
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ListTodo className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="font-medium">No checklist items yet</p>
                <p className="text-sm">Add tasks to prepare for your trip</p>
              </div>
            )}

            {/* Add New Task */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                className="flex-1"
              />
              <Button onClick={handleAddTask} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {checklist.length >= 5 && (
              <p className="text-sm text-amber-600">
                Free plan limit: 5 checklist items. Upgrade to Pro for unlimited items.
              </p>
            )}
          </div>

          {/* Limit Warning Modal */}
          <Dialog open={showLimitModal} onOpenChange={setShowLimitModal}>
            <DialogContent id="checklist-limit-warning">
              <DialogHeader>
                <DialogTitle>Upgrade to Pro</DialogTitle>
                <DialogDescription>
                  You've reached the limit of 5 checklist items on the free plan. 
                  Upgrade to Pro to add unlimited checklist items and unlock more features.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowLimitModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowLimitModal(false)} className="bg-spot-primary hover:bg-spot-primary/90">
                  Upgrade to Pro
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="text-sm text-blue-600 mt-4">
            Checklist stored in trip metadata
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripChecklistSection;
