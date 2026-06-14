import { useState, useEffect } from 'react';
import type { Order } from '../types';
import { orderService } from '../services/orderService';

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = () => {
        setLoading(true);
        const allOrders = orderService.getAllOrders();
        setOrders(allOrders);
        setLoading(false);
    };

    const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
        const newOrder = orderService.createOrder(orderData);
        setOrders(prev => [...prev, newOrder]);
        return newOrder;
    };

    const updateOrder = (id: string, updates: Partial<Order>) => {
        const updated = orderService.updateOrder(id, updates);
        if (updated) {
            setOrders(prev => prev.map(order => order.id === id ? updated : order));
        }
        return updated;
    };

    const deleteOrder = (id: string) => {
        const deleted = orderService.deleteOrder(id);
        if (deleted) {
            setOrders(prev => prev.filter(order => order.id !== id));
        }
        return deleted;
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        orders,
        loading,
        createOrder,
        updateOrder,
        deleteOrder,
        refreshOrders: loadOrders
    };
};