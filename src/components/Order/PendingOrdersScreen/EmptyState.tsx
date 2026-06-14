import React from 'react';
import { Package, Inbox, CheckCircle } from 'lucide-react';

interface EmptyStateProps {
    type: 'no-orders' | 'no-results' | 'no-payments';
    searchTerm?: string;
    onClearSearch?: () => void;
    onCreateOrder?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchTerm, onClearSearch, onCreateOrder }) => {
    if (type === 'no-orders') {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                    <Inbox className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Orders Yet</h3>
                <p className="text-gray-400 text-sm mb-4">Create your first order from the New Order screen</p>
                {onCreateOrder && (
                    <button
                        onClick={onCreateOrder}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Package className="w-4 h-4" />
                        Create New Order
                    </button>
                )}
            </div>
        );
    }

    if (type === 'no-payments') {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">All Payments Settled! 🎉</h3>
                <p className="text-gray-400 text-sm">No pending payments to collect</p>
                <p className="text-gray-400 text-sm mt-1">All orders have been fully paid</p>
            </div>
        );
    }

    // no-results
    return (
        <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Results Found</h3>
            <p className="text-gray-400 text-sm">
                {searchTerm ? `No items matching "${searchTerm}"` : 'No items available'}
            </p>
            {searchTerm && onClearSearch && (
                <button onClick={onClearSearch} className="mt-4 text-blue-500 text-sm hover:underline">
                    Clear Search
                </button>
            )}
        </div>
    );
};