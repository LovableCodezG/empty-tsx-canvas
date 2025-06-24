
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TripCreationCloseButton = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/dashboard');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClose}
      className="fixed top-4 left-4 z-50 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200"
    >
      <X className="h-5 w-5 text-gray-600" />
    </Button>
  );
};

export default TripCreationCloseButton;
