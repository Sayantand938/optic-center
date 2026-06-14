import React from 'react';
import { DollarSign, CreditCard } from 'lucide-react';
import type { Order } from '../../../types';

interface PaymentCardProps {
    order: Order;
    onReceivePayment: (order: Order) => void;
    onViewDetails: (orderId: string) => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ order, onReceivePayment, onViewDetails }) => {
    const finalAmount = order.bill?.finalAmount || 0;
    const paidAmount = order.bill?.advancePayment || 0;
    const balanceDue = finalAmount - paidAmount;
    const paymentProgress = finalAmount > 0 ? (paidAmount / finalAmount) * 100 : 0;

    const getPaymentStatus = () => {
        if (balanceDue === 0) return { text: 'Paid', color: 'text-green-600', bg: 'bg-green-100' };
        if (balanceDue < 500) return { text: 'Low Balance', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        return { text: 'Pending', color: 'text-red-600', bg: 'bg-red-100' };
    };

    const status = getPaymentStatus();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-500">
                        {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                </div>
                <span className={`px-2 py-1 ${status.bg} ${status.color} rounded-full text-xs font-medium`}>
                    {status.text}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium">{order.customer?.phoneNumber}</p>
                </div>
                <div>
                    <span className="text-gray-500">Total:</span>
                    <p className="font-bold">₹{finalAmount.toFixed(2)}</p>
                </div>
                <div>
                    <span className="text-gray-500">Paid:</span>
                    <p className="text-green-600">₹{paidAmount.toFixed(2)}</p>
                </div>
                <div>
                    <span className="text-gray-500">Balance:</span>
                    <p className="text-orange-600 font-bold">₹{balanceDue.toFixed(2)}</p>
                </div>
            </div>

            <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Payment Progress</span>
                    <span>{paymentProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${paymentProgress}%` }}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onReceivePayment(order)}
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors flex items-center justify-center gap-1"
                >
                    <DollarSign className="w-4 h-4" />
                    Receive Payment
                </button>
                <button
                    onClick={() => onViewDetails(order.id)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                    <CreditCard className="w-4 h-4" />
                    View Details
                </button>
            </div>
        </div>
    );
};