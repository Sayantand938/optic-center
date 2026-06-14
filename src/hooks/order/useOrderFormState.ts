import { useState } from 'react';
import { initialFormData } from '../../constants/orderConstants';

export const useOrderFormState = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate totals
    const framesTotal = formData.purchase.frames.reduce((sum, frame) => sum + (frame.price * frame.quantity), 0);
    const lensesTotal = formData.purchase.lenses.reduce((sum, lens) => sum + (lens.price * lens.quantity), 0);
    const subtotal = framesTotal + lensesTotal;

    // Calculate bill amounts
    const discountAmount = formData.bill.discountType === 'percentage'
        ? (subtotal * formData.bill.discount / 100)
        : formData.bill.discount;
    const finalAmount = subtotal - discountAmount;
    const balanceDue = finalAmount - formData.bill.advancePayment;

    const updateBill = () => {
        setFormData(prev => ({
            ...prev,
            bill: {
                ...prev.bill,
                subtotal: subtotal,
                finalAmount: finalAmount,
                balanceDue: balanceDue
            }
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return {
        formData,
        setFormData,
        showSuccess,
        setShowSuccess,
        isSubmitting,
        setIsSubmitting,
        framesTotal,
        lensesTotal,
        subtotal,
        finalAmount,
        balanceDue,
        updateBill,
        resetForm
    };
};