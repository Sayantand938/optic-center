import React, { useEffect } from 'react';
import { Receipt, Percent, DollarSign, Wallet } from 'lucide-react';
import type { BillDetails } from '../../types';

interface BillDetailsSectionProps {
    bill: BillDetails;
    framesTotal: number;
    lensesTotal: number;
    onDiscountChange: (value: number) => void;
    onDiscountTypeChange: (type: 'percentage' | 'fixed') => void;
    onAdvancePaymentChange: (value: number) => void;
    onPaymentMethodChange: (method: 'cash' | 'card' | 'upi' | 'bank_transfer') => void;
}

export const BillDetailsSection: React.FC<BillDetailsSectionProps> = ({
    bill,
    framesTotal,
    lensesTotal,
    onDiscountChange,
    onDiscountTypeChange,
    onAdvancePaymentChange,
    onPaymentMethodChange
}) => {
    const subtotal = framesTotal + lensesTotal;
    const discountAmount = bill.discountType === 'percentage'
        ? (subtotal * bill.discount / 100)
        : bill.discount;
    const finalAmount = subtotal - discountAmount;
    const balanceDue = finalAmount - bill.advancePayment;

    // Auto-calculate when values change
    useEffect(() => {
        // This ensures the parent component has updated values
    }, [subtotal, discountAmount, finalAmount, balanceDue]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-500" />
                Bill Details
            </h3>

            <div className="space-y-4">
                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Frames Total:</span>
                        <span className="font-semibold">₹{framesTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lenses Total:</span>
                        <span className="font-semibold">₹{lensesTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                </div>

                {/* Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Percent className="w-4 h-4" />
                            Discount Type
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onDiscountTypeChange('percentage')}
                                className={`flex-1 px-3 py-2 rounded-lg border transition-all ${bill.discountType === 'percentage'
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'bg-white border-gray-300 text-gray-600'
                                    }`}
                            >
                                Percentage (%)
                            </button>
                            <button
                                type="button"
                                onClick={() => onDiscountTypeChange('fixed')}
                                className={`flex-1 px-3 py-2 rounded-lg border transition-all ${bill.discountType === 'fixed'
                                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                                        : 'bg-white border-gray-300 text-gray-600'
                                    }`}
                            >
                                Fixed (₹)
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Discount {bill.discountType === 'percentage' ? '(%)' : '(₹)'}
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={bill.discount}
                            onChange={(e) => onDiscountChange(parseFloat(e.target.value) || 0)}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>

                {/* After Discount */}
                <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">After Discount:</span>
                        <span className="text-xl font-bold text-green-700">₹{finalAmount.toFixed(2)}</span>
                    </div>
                </div>

                {/* Advance Payment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Advance Payment
                        </label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={bill.advancePayment}
                            onChange={(e) => onAdvancePaymentChange(parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Wallet className="w-4 h-4" />
                            Payment Method
                        </label>
                        <select
                            value={bill.paymentMethod}
                            onChange={(e) => onPaymentMethodChange(e.target.value as any)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        >
                            <option value="cash">Cash</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>
                </div>

                {/* Balance Due */}
                <div className={`rounded-lg p-4 ${balanceDue > 0 ? 'bg-orange-50' : 'bg-green-50'}`}>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Balance Due:</span>
                        <span className={`text-xl font-bold ${balanceDue > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            ₹{balanceDue.toFixed(2)}
                        </span>
                    </div>
                    {balanceDue === 0 && (
                        <p className="text-xs text-green-600 mt-1">✓ Fully Paid</p>
                    )}
                    {balanceDue > 0 && (
                        <p className="text-xs text-orange-600 mt-1">Amount pending to be paid</p>
                    )}
                </div>
            </div>
        </div>
    );
};