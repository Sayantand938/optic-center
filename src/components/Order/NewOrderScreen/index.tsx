import React from 'react';
import { HeaderBanner } from './HeaderBanner';
import { SuccessToast } from './SuccessToast';
import { OrderForm } from './OrderForm';
import { useOrderForm } from '../../../hooks/order/useOrderForm';
import { useOrderSubmit } from '../../../hooks/order/useOrderSubmit';

interface NewOrderScreenProps {
    onOrderCreated?: () => void;
}

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({ onOrderCreated }) => {
    const {
        formData,
        showSuccess,
        setShowSuccess,
        isSubmitting,
        setIsSubmitting,
        handleOrderDetailsChange,
        handleCustomerChange,
        handleOptometristChange,
        handleRightEyeChange,
        handleLeftEyeChange,
        handlePDChange,
        handleNotesChange,
        resetForm
    } = useOrderForm();

    const { submitOrder } = useOrderSubmit({
        formData,
        onSuccess: () => {
            setShowSuccess(true);
            resetForm();
            setTimeout(() => setShowSuccess(false), 3000);
            if (onOrderCreated) onOrderCreated();
        },
        onError: (error) => {
            alert('Failed to create order. Please try again.');
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await submitOrder();
        setIsSubmitting(false);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            resetForm();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
            <HeaderBanner />
            <SuccessToast show={showSuccess} />

            <OrderForm
                formData={formData}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onReset={handleReset}
                onOrderDetailsChange={handleOrderDetailsChange}
                onCustomerChange={handleCustomerChange}
                onOptometristChange={handleOptometristChange}
                onRightEyeChange={handleRightEyeChange}
                onLeftEyeChange={handleLeftEyeChange}
                onPDChange={handlePDChange}
                onNotesChange={handleNotesChange}
            />
        </div>
    );
};