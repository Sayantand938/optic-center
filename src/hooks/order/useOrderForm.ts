import { useState } from 'react';
import type { EyePrescription, PDMeasurements } from '../../types';
import { initialFormData } from '../../constants/orderConstants';

export const useOrderForm = () => {
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

    const handleRightEyeChange = (field: keyof EyePrescription, value: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                rightEye: { ...prev.prescription.rightEye, [field]: value }
            }
        }));
    };

    const handleLeftEyeChange = (field: keyof EyePrescription, value: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                leftEye: { ...prev.prescription.leftEye, [field]: value }
            }
        }));
    };

    const handlePDChange = (field: keyof PDMeasurements, value: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                pd: { ...prev.prescription.pd, [field]: value }
            }
        }));
    };

    const handleNotesChange = (notes: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: { ...prev.prescription, notes }
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return {
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
    };
};