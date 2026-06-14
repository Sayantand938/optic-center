import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessToastProps {
    show: boolean;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({ show }) => {
    if (!show) return null;

    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Order created successfully!</span>
            </div>
        </div>
    );
};