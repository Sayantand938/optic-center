import React from 'react';
import { Search } from 'lucide-react';

interface OrderSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const OrderSearchBar: React.FC<OrderSearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, order ID, or phone..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
        </div>
    );
};