
import React from 'react';
import { motion } from 'framer-motion';
import { useTripCreation } from '@/contexts/TripCreationContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BudgetInputSection = () => {
  const { state, dispatch } = useTripCreation();

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? null : parseFloat(value);
    
    if (state.tripType === 'personal') {
      dispatch({ type: 'SET_USER_BUDGET', payload: numericValue });
    } else {
      dispatch({ type: 'SET_GROUP_BUDGET_PER_HEAD', payload: numericValue });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card className="border-2 border-spot-primary/20 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-spot-primary">Set Your Budget</CardTitle>
          <p className="text-sm text-gray-600">
            Set your budget to track if your plan is within limits.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor={state.tripType === 'personal' ? 'user-budget' : 'group-budget-per-head'}>
              {state.tripType === 'personal' 
                ? 'Your total trip budget (₹)' 
                : 'Per person group budget (₹)'
              }
            </Label>
            <Input
              id={state.tripType === 'personal' ? 'user-budget' : 'group-budget-per-head'}
              type="number"
              placeholder="Enter your budget"
              value={state.tripType === 'personal' ? (state.userBudget || '') : (state.groupBudgetPerHead || '')}
              onChange={handleBudgetChange}
              className="text-lg font-medium"
              min="0"
              step="1000"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BudgetInputSection;
