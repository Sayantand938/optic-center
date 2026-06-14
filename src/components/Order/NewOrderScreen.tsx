import React, { useState } from 'react';
import { ShoppingBag, Save, RefreshCw, CheckCircle } from 'lucide-react';
import { OrderDetailsSection } from './OrderDetailsSection';
import { CustomerDetailsSection } from './CustomerDetailsSection';
import { OptometristDetailsSection } from './OptometristDetailsSection';
import { useOrders } from '../../hooks/useOrders';
import type { OrderStatus, Gender, AgeGroup } from '../../types';

interface NewOrderScreenProps {
    onOrderCreated?: () => void;
}

const initialFormData = {
    orderDetails: {
        orderDate: new Date().toISOString().split('T')[0],
        completionDate: '',
        status: 'pending' as OrderStatus
    },
    customer: {
        firstName: '',
        lastName: '',
        gender: 'male' as Gender,
        ageGroup: '20-35' as AgeGroup,
        phoneNumber: ''
    },
    optometrist: {
        eyeCheckupDate: new Date().toISOString().split('T')[0],
        doctorName: '',
        hospitalName: ''
    }
};

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({ onOrderCreated }) => {
    const { createOrder } = useOrders();
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOrderDetailsChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            orderDetails: { ...prev.orderDetails, [field]: value }
        }));
    };

    const handleCustomerChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    const handleOptometristChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            optometrist: { ...prev.optometrist, [field]: value }
        }));
    };

    const validateForm = (): boolean => {
        const { orderDetails, customer, optometrist } = formData;

        if (!orderDetails.orderDate) {
            alert('Please select order date');
            return false;
        }

        if (!customer.firstName || !customer.lastName) {
            alert('Please enter customer full name');
            return false;
        }

        if (!customer.phoneNumber) {
            alert('Please enter customer phone number');
            return false;
        }

        if (!optometrist.doctorName || !optometrist.hospitalName) {
            alert('Please enter optometrist details');
            return false;
        }

        if (!optometrist.eyeCheckupDate) {
            alert('Please select eye checkup date');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const newOrder = createOrder({
                orderDetails: formData.orderDetails,
                customer: formData.customer,
                optometrist: formData.optometrist
            });

            setShowSuccess(true);
            setFormData(initialFormData);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

            if (onOrderCreated) {
                onOrderCreated();
            }

            console.log('Order created:', newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            setFormData(initialFormData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-6 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-6 h-6" />
                    <h2 className="text-xl font-semibold">Create New Order</h2>
                </div>
                <p className="text-blue-100 text-sm">Fill in the details to create a new optical order</p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Order created successfully!</span>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-4 max-w-lg mx-auto">
                <OrderDetailsSection
                    formData={formData.orderDetails}
                    onChange={handleOrderDetailsChange}
                />

                <CustomerDetailsSection
                    formData={formData.customer}
                    onChange={handleCustomerChange}
                />

                <OptometristDetailsSection
                    formData={formData.optometrist}
                    onChange={handleOptometristChange}
                />

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500/20"
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? 'Creating...' : 'Create Order'}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-500/20"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};