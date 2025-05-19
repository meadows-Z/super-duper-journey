import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  type: ToastMessage['type'];
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const bgColor = {
    success: 'bg-success-500',
    error: 'bg-error-500',
    info: 'bg-accent-500',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[type];

  return (
    <div 
      className={`rounded-lg shadow-lg ${bgColor} text-white px-4 py-3 flex items-center animate-slide-up min-w-[260px]`}
    >
      <Icon className="w-5 h-5 mr-2" />
      <p className="flex-1">{message}</p>
      <button 
        onClick={onClose} 
        className="p-1 ml-2 text-white hover:bg-white/10 rounded-full"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;