import React from 'react';
import { Wallet } from 'lucide-react';

export const PaymentHeader: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Pending Payments</h2>
            </div>
            <p className="text-purple-100 text-sm">Track and collect pending payments</p>
        </div>
    );
};