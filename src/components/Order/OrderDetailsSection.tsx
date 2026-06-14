import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import type { OrderStatus } from '../../types';

interface OrderDetailsSectionProps {
    formData: {
        orderDate: string;
        completionDate: string;
        status: OrderStatus;
    };
    onChange: (field: string, value: any) => void;
}

export const OrderDetailsSection: React.FC<OrderDetailsSectionProps> = ({ formData, onChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Order Details
            </h3>

            <div className="space-y-3">
                {/* Order Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Date *
                    </label>
                    <input
                        type="date"
                        value={formData.orderDate}
                        onChange={(e) => onChange('orderDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                    />
                </div>

                {/* Completion Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Completion Date
                    </label>
                    <input
                        type="date"
                        value={formData.completionDate}
                        onChange={(e) => onChange('completionDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                {/* Order Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Order Status *
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => onChange('status', 'pending')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500/20 ${formData.status === 'pending'
                                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            Pending
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('status', 'complete')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500/20 ${formData.status === 'complete'
                                    ? 'bg-green-50 border-green-500 text-green-700'
                                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Complete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};