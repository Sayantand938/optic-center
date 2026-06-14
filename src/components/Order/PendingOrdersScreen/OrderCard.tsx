import React from 'react';
import { Eye, CheckCircle, Clock } from 'lucide-react';
import type { Order } from '../../../types';

interface OrderCardProps {
    order: Order;
    onComplete: (orderId: string) => void;
    onView: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onComplete, onView }) => {
    const getStatusBadge = (status: string) => {
        if (status === 'complete') {
            return (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Complete
                </span>
            );
        }
        return (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" /> Pending
            </span>
        );
    };

    const getFrameCount = () => order.purchase?.frames?.length || 0;
    const getLensCount = () => order.purchase?.lenses?.length || 0;
    const getFinalAmount = () => order.bill?.finalAmount || 0;
    // Fixed: Added parentheses to clarify operator precedence
    const getBalanceDue = () => {
        if (order.bill?.balanceDue !== undefined && order.bill?.balanceDue !== null) {
            return order.bill.balanceDue;
        }
        return (order.bill?.finalAmount || 0) - (order.bill?.advancePayment || 0);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-500">
                        {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                </div>
                {getStatusBadge(order.orderDetails?.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div>
                    <span className="text-gray-500">Order Date:</span>
                    <p className="font-medium">{order.orderDetails?.orderDate}</p>
                </div>
                <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium">{order.customer?.phoneNumber}</p>
                </div>
                <div>
                    <span className="text-gray-500">Frames:</span>
                    <p className="font-medium">{getFrameCount()} items</p>
                </div>
                <div>
                    <span className="text-gray-500">Lenses:</span>
                    <p className="font-medium">{getLensCount()} items</p>
                </div>
                <div>
                    <span className="text-gray-500">Total Amount:</span>
                    <p className="font-bold text-blue-600">₹{getFinalAmount().toFixed(2)}</p>
                </div>
                <div>
                    <span className="text-gray-500">Balance Due:</span>
                    <p className={`font-bold ${getBalanceDue() > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                        ₹{getBalanceDue().toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                {order.orderDetails?.status === 'pending' && (
                    <button
                        onClick={() => onComplete(order.id)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                    >
                        <CheckCircle className="w-4 h-4" />
                        Mark Complete
                    </button>
                )}
                <button
                    onClick={() => onView(order.id)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                    <Eye className="w-4 h-4" />
                    View Details
                </button>
            </div>
        </div>
    );
};