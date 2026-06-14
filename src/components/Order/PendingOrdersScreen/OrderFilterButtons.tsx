import React from 'react';

interface OrderFilterButtonsProps {
    filterStatus: 'all' | 'pending' | 'complete';
    onFilterChange: (status: 'all' | 'pending' | 'complete') => void;
}

export const OrderFilterButtons: React.FC<OrderFilterButtonsProps> = ({ filterStatus, onFilterChange }) => {
    const getButtonClass = (value: string, color: string) => {
        if (filterStatus === value) {
            if (color === 'blue') return 'bg-blue-500 text-white';
            if (color === 'green') return 'bg-green-500 text-white';
            return 'bg-gray-700 text-white';
        }
        return 'bg-white text-gray-600 border border-gray-300';
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => onFilterChange('pending')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all ${getButtonClass('pending', 'blue')}`}
            >
                Pending
            </button>
            <button
                onClick={() => onFilterChange('complete')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all ${getButtonClass('complete', 'green')}`}
            >
                Complete
            </button>
            <button
                onClick={() => onFilterChange('all')}
                className={`flex-1 px-3 py-2 rounded-lg transition-all ${getButtonClass('all', 'gray')}`}
            >
                All
            </button>
        </div>
    );
};