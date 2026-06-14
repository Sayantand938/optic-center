import React from 'react';
import { Search } from 'lucide-react';

interface PaymentSearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const PaymentSearchBar: React.FC<PaymentSearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name, order ID, or phone..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
        </div>
    );
};