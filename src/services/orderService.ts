import type { Order } from '../types';

// In-memory storage (replace with Dexie/Supabase later)
let orders: Order[] = [];

// Load initial demo data if empty
const loadDemoData = () => {
    if (orders.length === 0) {
        orders = [
            {
                id: 'ORD-001',
                orderDetails: {
                    orderDate: new Date().toISOString().split('T')[0],
                    completionDate: '',
                    status: 'pending'
                },
                customer: {
                    firstName: 'John',
                    lastName: 'Doe',
                    gender: 'male',
                    ageGroup: '36-50',
                    phoneNumber: '+1234567890'
                },
                optometrist: {
                    eyeCheckupDate: new Date().toISOString().split('T')[0],
                    doctorName: 'Dr. Sarah Smith',
                    hospitalName: 'City Eye Hospital'
                },
                createdAt: new Date().toISOString()
            },
            {
                id: 'ORD-002',
                orderDetails: {
                    orderDate: new Date().toISOString().split('T')[0],
                    completionDate: new Date().toISOString().split('T')[0],
                    status: 'complete'
                },
                customer: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    gender: 'female',
                    ageGroup: '20-35',
                    phoneNumber: '+1987654321'
                },
                optometrist: {
                    eyeCheckupDate: new Date().toISOString().split('T')[0],
                    doctorName: 'Dr. Michael Brown',
                    hospitalName: 'Vision Care Center'
                },
                createdAt: new Date().toISOString()
            }
        ];
    }
};

export const orderService = {
    // Get all orders
    getAllOrders: (): Order[] => {
        loadDemoData();
        return [...orders];
    },

    // Get order by ID
    getOrderById: (id: string): Order | undefined => {
        loadDemoData();
        return orders.find(order => order.id === id);
    },

    // Create new order
    createOrder: (order: Omit<Order, 'id' | 'createdAt'>): Order => {
        loadDemoData();
        const newOrder: Order = {
            ...order,
            id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
            createdAt: new Date().toISOString()
        };
        orders.push(newOrder);
        return newOrder;
    },

    // Update order
    updateOrder: (id: string, updates: Partial<Order>): Order | undefined => {
        const index = orders.findIndex(order => order.id === id);
        if (index === -1) return undefined;

        orders[index] = { ...orders[index], ...updates };
        return orders[index];
    },

    // Delete order
    deleteOrder: (id: string): boolean => {
        const initialLength = orders.length;
        orders = orders.filter(order => order.id !== id);
        return orders.length !== initialLength;
    }
};