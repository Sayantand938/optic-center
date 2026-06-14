import React from 'react';
import type { Order } from '../../../types';

interface PaymentModalProps {
    order: Order | null;
    paymentAmount: string;
    onAmountChange: (value: string) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
    order,
    paymentAmount,
    onAmountChange,
    onConfirm,
    onCancel
}) => {
    if (!order) return null;

    const finalAmount = order.bill?.finalAmount || 0;
    const paidAmount = order.bill?.advancePayment || 0;
    const balanceDue = finalAmount - paidAmount;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-5">
                <h3 className="text-lg font-semibold mb-4">Record Payment</h3>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">
                        Customer: {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                    <p className="text-sm font-semibold mt-2">
                        Balance Due: ₹{balanceDue.toFixed(2)}
                    </p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount (₹)</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={paymentAmount}
                        onChange={(e) => onAmountChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        Confirm Payment
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};