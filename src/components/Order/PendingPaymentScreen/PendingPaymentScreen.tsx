import React, { useState, useEffect } from 'react';
import { PaymentHeader } from './PaymentHeader';
import { PaymentSearchBar } from './PaymentSearchBar';
import { PaymentCard } from './PaymentCard';
import { PaymentModal } from './PaymentModal';
import { EmptyState } from '../PendingOrdersScreen/EmptyState';
import { useOrderStore } from '../../../stores/orderStore';
import { OrderDetailsScreen } from '../OrderDetailsScreen';
import type { Order } from '../../../types';

interface PendingPaymentScreenProps {
    onViewOrder?: (orderId: string) => void;
}

export const PendingPaymentScreen: React.FC<PendingPaymentScreenProps> = ({  }) => {
    const { orders, updateOrder } = useOrderStore();
    const [pendingPaymentOrders, setPendingPaymentOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const filtered = orders.filter(order => {
            const finalAmount = order.bill?.finalAmount || 0;
            const advancePayment = order.bill?.advancePayment || 0;
            const balanceDue = finalAmount - advancePayment;
            const matchesSearch = searchTerm === '' ||
                order.customer?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer?.phoneNumber?.includes(searchTerm);
            return balanceDue > 0 && matchesSearch;
        });
        setPendingPaymentOrders(filtered);
    }, [orders, searchTerm]);

    const handleReceivePayment = (order: Order) => {
        setSelectedOrder(order);
        const balanceDue = (order.bill?.finalAmount || 0) - (order.bill?.advancePayment || 0);
        setPaymentAmount(balanceDue.toFixed(2));
    };

    const handleConfirmPayment = () => {
        if (!selectedOrder) return;

        const amount = parseFloat(paymentAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const currentAdvancePayment = selectedOrder.bill?.advancePayment || 0;
        const finalAmount = selectedOrder.bill?.finalAmount || 0;

        if (amount > (finalAmount - currentAdvancePayment)) {
            alert('Payment amount cannot exceed balance due');
            return;
        }

        const newAdvancePayment = currentAdvancePayment + amount;
        const newBalanceDue = finalAmount - newAdvancePayment;

        updateOrder(selectedOrder.id, {
            bill: {
                ...selectedOrder.bill,
                advancePayment: newAdvancePayment,
                balanceDue: newBalanceDue
            }
        });

        setSelectedOrder(null);
        setPaymentAmount('');
        alert(`Payment of ₹${amount.toFixed(2)} recorded successfully!`);
    };

    const hasPendingPayments = orders.some(order => {
        const finalAmount = order.bill?.finalAmount || 0;
        const advancePayment = order.bill?.advancePayment || 0;
        return (finalAmount - advancePayment) > 0;
    });

    const hasFilteredResults = pendingPaymentOrders.length > 0;

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
            <PaymentHeader />

            {hasPendingPayments && (
                <div className="px-4 mb-4">
                    <PaymentSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                </div>
            )}

            <div className="px-4">
                {!hasPendingPayments ? (
                    <EmptyState type="no-payments" />
                ) : !hasFilteredResults ? (
                    <EmptyState
                        type="no-results"
                        searchTerm={searchTerm}
                        onClearSearch={() => setSearchTerm('')}
                    />
                ) : (
                    <div className="space-y-3">
                        {pendingPaymentOrders.map((order) => (
                            <PaymentCard
                                key={order.id}
                                order={order}
                                onReceivePayment={handleReceivePayment}
                                onViewDetails={(id) => setSelectedOrderId(id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <PaymentModal
                order={selectedOrder}
                paymentAmount={paymentAmount}
                onAmountChange={setPaymentAmount}
                onConfirm={handleConfirmPayment}
                onCancel={() => setSelectedOrder(null)}
            />
        </div>
    );
};