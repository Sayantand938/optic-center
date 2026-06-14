import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const HeaderBanner: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Create New Order</h2>
            </div>
            <p className="text-blue-100 text-sm">Fill in the details to create a new optical order</p>
        </div>
    );
};