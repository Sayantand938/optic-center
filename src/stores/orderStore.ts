import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order } from '../types';

interface OrderStore {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrder: (id: string, updates: Partial<Order>) => void;
    deleteOrder: (id: string) => void;
    getOrderById: (id: string) => Order | undefined;
    getOrdersByStatus: (status: 'pending' | 'complete') => Order[];
    getPendingPaymentOrders: () => Order[];
    clearAllOrders: () => void;
}

// Demo data
const demoOrders: Order[] = [
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
        purchase: {
            frames: [],
            lenses: []
        },
        bill: {
            subtotal: 0,
            discount: 0,
            discountType: 'percentage',
            advancePayment: 0,
            paymentMethod: 'cash',
            finalAmount: 0,
            balanceDue: 0
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
        purchase: {
            frames: [],
            lenses: []
        },
        bill: {
            subtotal: 0,
            discount: 0,
            discountType: 'percentage',
            advancePayment: 0,
            paymentMethod: 'cash',
            finalAmount: 0,
            balanceDue: 0
        },
        createdAt: new Date().toISOString()
    }
];

export const useOrderStore = create<OrderStore>()(
    persist(
        (set, get) => ({
            orders: demoOrders,

            addOrder: (order) => {
                set((state) => ({ orders: [...state.orders, order] }));
            },

            updateOrder: (id, updates) => {
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === id ? { ...order, ...updates } : order
                    )
                }));
            },

            deleteOrder: (id) => {
                set((state) => ({
                    orders: state.orders.filter((order) => order.id !== id)
                }));
            },

            getOrderById: (id) => {
                return get().orders.find((order) => order.id === id);
            },

            getOrdersByStatus: (status) => {
                return get().orders.filter((order) => order.orderDetails.status === status);
            },

            getPendingPaymentOrders: () => {
                return get().orders.filter((order) => {
                    const balanceDue = order.bill.finalAmount - order.bill.advancePayment;
                    return balanceDue > 0;
                });
            },

            clearAllOrders: () => {
                set({ orders: [] });
            }
        }),
        {
            name: 'optical-store-orders', // localStorage key
        }
    )
);