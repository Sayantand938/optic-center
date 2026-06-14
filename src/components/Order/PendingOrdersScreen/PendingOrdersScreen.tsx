import React, { useState, useEffect } from 'react';
import { HeaderBanner } from './HeaderBanner';
import { OrderSearchBar } from './OrderSearchBar';
import { OrderFilterButtons } from './OrderFilterButtons';
import { OrderCard } from './OrderCard';
import { EmptyState } from './EmptyState';
import { useOrderStore } from '../../../stores/orderStore';
import { OrderDetailsScreen } from '../OrderDetailsScreen';
import type { Order } from '../../../types';

interface PendingOrdersScreenProps {
    onViewOrder?: (orderId: string) => void;
}

export const PendingOrdersScreen: React.FC<PendingOrdersScreenProps> = ({  }) => {
    const { orders, updateOrder } = useOrderStore();
    const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'complete'>('pending');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const filtered = orders.filter(order => {
            const matchesStatus = filterStatus === 'all' ? true : order.orderDetails?.status === filterStatus;
            const matchesSearch = searchTerm === '' ||
                order.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer?.phoneNumber?.includes(searchTerm);
            return matchesStatus && matchesSearch;
        });
        setPendingOrders(filtered);
    }, [orders, searchTerm, filterStatus]);

    const handleCompleteOrder = (orderId: string) => {
        if (confirm('Mark this order as complete?')) {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                updateOrder(orderId, {
                    orderDetails: {
                        ...order.orderDetails,
                        status: 'complete',
                        completionDate: new Date().toISOString().split('T')[0]
                    }
                });
            }
        }
    };

    const handleCreateOrder = () => {
        const menuItem = document.querySelector('[data-screen="New Order"]') as HTMLElement;
        if (menuItem) menuItem.click();
    };

    const hasOrders = orders.length > 0;
    const hasFilteredResults = pendingOrders.length > 0;

    // Show order details if an order is selected
    if (selectedOrderId) {
        return (
            <OrderDetailsScreen
                orderId={selectedOrderId}
                onBack={() => setSelectedOrderId(null)}
                onOrderUpdated={() => {
                    // Refresh will happen automatically via store
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
            <HeaderBanner />

            {hasOrders && (
                <div className="px-4 mb-4">
                    <OrderSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <OrderFilterButtons filterStatus={filterStatus} onFilterChange={setFilterStatus} />
                </div>
            )}

            <div className="px-4">
                {!hasOrders ? (
                    <EmptyState type="no-orders" onCreateOrder={handleCreateOrder} />
                ) : !hasFilteredResults ? (
                    <EmptyState type="no-results" searchTerm={searchTerm} onClearSearch={() => setSearchTerm('')} />
                ) : (
                    <div className="space-y-3">
                        {pendingOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onComplete={handleCompleteOrder}
                                onView={(id) => setSelectedOrderId(id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};