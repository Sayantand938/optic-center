import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit } from 'lucide-react';
import { useOrderStore } from '../../../stores/orderStore';
import { OrderView } from './OrderView';
import { OrderEditForm } from './OrderEditForm';
import type { Order } from '../../../types';

interface OrderDetailsScreenProps {
    orderId: string;
    onBack: () => void;
    onOrderUpdated?: () => void;
}

export const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({
    orderId,
    onBack,
    onOrderUpdated
}) => {
    const { orders, updateOrder } = useOrderStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundOrder = orders.find((o: Order) => o.id === orderId);
        if (foundOrder) {
            setOrder(foundOrder);
        }
        setLoading(false);
    }, [orders, orderId]);

    const handleUpdateOrder = (updatedData: Partial<Order>) => {
        if (order) {
            updateOrder(order.id, updatedData);
            setOrder({ ...order, ...updatedData });
            setIsEditing(false);
            if (onOrderUpdated) onOrderUpdated();
            alert('Order updated successfully!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
                <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-6 mb-4">
                    <button onClick={onBack} className="flex items-center gap-2 text-white mb-2">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <h2 className="text-xl font-semibold">Order Not Found</h2>
                </div>
                <div className="text-center py-16">
                    <p className="text-gray-500">The order you're looking for doesn't exist.</p>
                    <button onClick={onBack} className="mt-4 text-blue-500 hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 mb-4">
                <div className="flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-white">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <h2 className="text-lg font-semibold">Order Details</h2>
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-white">
                            <Edit className="w-5 h-5" />
                            Edit
                        </button>
                    ) : (
                        <div className="w-16"></div>
                    )}
                </div>
                <p className="text-blue-100 text-sm mt-2">Order ID: {order.id}</p>
            </div>

            {isEditing ? (
                <OrderEditForm order={order} onSave={handleUpdateOrder} onCancel={() => setIsEditing(false)} />
            ) : (
                <OrderView order={order} />
            )}
        </div>
    );
};