
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TripChecklistSectionProps {
  viewMode?: boolean;
}

const TripChecklistSection = ({ viewMode = false }: TripChecklistSectionProps) => {
  const { state, dispatch } = useTripCreation();
  const [newItem, setNewItem] = React.useState('');

  const handleChecklistToggle = (itemId: string) => {
    if (!viewMode) {
      dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: itemId });
    }
  };

  const handleAddItem = () => {
    if (!viewMode && newItem.trim()) {
      dispatch({ 
        type: 'ADD_CHECKLIST_ITEM', 
        payload: { 
          id: `item-${Date.now()}`, 
          text: newItem.trim(), 
          completed: false 
        } 
      });
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (!viewMode) {
      dispatch({ type: 'REMOVE_CHECKLIST_ITEM', payload: itemId });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <CheckSquare className="h-5 w-5 text-spot-primary" />
        <h2 className="text-xl font-semibold text-gray-900">Trip Checklist</h2>
      </div>
      
      <div className="space-y-3">
        {state.checklistItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 group">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => handleChecklistToggle(item.id)}
              disabled={viewMode}
            />
            <label
              htmlFor={item.id}
              className={`flex-1 text-sm ${
                item.completed ? 'line-through text-gray-500' : 'text-gray-700'
              } cursor-pointer`}
            >
              {item.text}
            </label>
            {!viewMode && (
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        
        {!viewMode && (
          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Add new checklist item..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1"
            />
            <Button
              onClick={handleAddItem}
              disabled={!newItem.trim()}
              size="sm"
              className="bg-spot-primary hover:bg-spot-primary/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TripChecklistSection;
