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
                prescription: {
                    rightEye: {
                        sph: '-2.00',
                        cyl: '-0.50',
                        axis: '180',
                        va: '6/6',
                        d: '-2.00',
                        n: '-1.50',
                        add: '+2.00',
                        cl: '-2.00'
                    },
                    leftEye: {
                        sph: '-1.75',
                        cyl: '-0.25',
                        axis: '175',
                        va: '6/6',
                        d: '-1.75',
                        n: '-1.25',
                        add: '+2.00',
                        cl: '-1.75'
                    },
                    pd: {
                        right: '32.0',
                        left: '32.0',
                        total: '64.0'
                    },
                    notes: 'Patient prefers progressive lenses'
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
                prescription: {
                    rightEye: {
                        sph: '-3.00',
                        cyl: '-0.75',
                        axis: '165',
                        va: '6/9',
                        d: '-3.00',
                        n: '-2.50',
                        add: '+1.50',
                        cl: '-3.00'
                    },
                    leftEye: {
                        sph: '-2.75',
                        cyl: '-0.50',
                        axis: '170',
                        va: '6/9',
                        d: '-2.75',
                        n: '-2.25',
                        add: '+1.50',
                        cl: '-2.75'
                    },
                    pd: {
                        right: '31.5',
                        left: '31.5',
                        total: '63.0'
                    },
                    notes: 'Anti-glare coating recommended'
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