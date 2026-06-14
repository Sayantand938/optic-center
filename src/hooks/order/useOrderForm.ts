import { useOrderStore } from '../../stores/orderStore';
import { useOrderFormState } from './useOrderFormState';
import { useOrderFrameHandlers } from './useOrderFrameHandlers';
import { useOrderLensHandlers } from './useOrderLensHandlers';
import { useOrderBillHandlers } from './useOrderBillHandlers';

export const useOrderForm = () => {
    const addOrder = useOrderStore((state) => state.addOrder);

    // State management
    const {
        formData,
        setFormData,
        showSuccess,
        setShowSuccess,
        isSubmitting,
        setIsSubmitting,
        framesTotal,
        lensesTotal,
        updateBill,
        resetForm
    } = useOrderFormState();

    // Frame handlers
    const { frames, handleAddFrame, handleUpdateFrame, handleRemoveFrame } = useOrderFrameHandlers({ formData, setFormData, updateBill });

    // Lens handlers
    const { lenses, handleAddLens, handleUpdateLens, handleRemoveLens } = useOrderLensHandlers({ formData, setFormData, updateBill });

    // Bill handlers
    const { bill, handleDiscountChange, handleDiscountTypeChange, handleAdvancePaymentChange, handlePaymentMethodChange } = useOrderBillHandlers({ formData, setFormData, updateBill });

    // Direct handlers for order details, customer, optometrist, prescription
    const handleOrderDetailsChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            orderDetails: { ...prev.orderDetails, [field]: value }
        }));
        updateBill();
    };

    const handleCustomerChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    const handleOptometristChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            optometrist: { ...prev.optometrist, [field]: value }
        }));
    };

    const handleRightEyeChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                rightEye: { ...prev.prescription.rightEye, [field]: value }
            }
        }));
    };

    const handleLeftEyeChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                leftEye: { ...prev.prescription.leftEye, [field]: value }
            }
        }));
    };

    const handlePDChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                pd: { ...prev.prescription.pd, [field]: value }
            }
        }));
    };

    const handleNotesChange = (notes: string) => {
        setFormData((prev: any) => ({
            ...prev,
            prescription: { ...prev.prescription, notes }
        }));
    };

    // Create order using Zustand store
    const createOrder = () => {
        const newOrder = {
            id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            orderDetails: formData.orderDetails,
            customer: formData.customer,
            optometrist: formData.optometrist,
            prescription: formData.prescription,
            purchase: formData.purchase,
            bill: formData.bill,
            createdAt: new Date().toISOString()
        };
        addOrder(newOrder);
        return newOrder;
    };

    return {
        // State
        formData,
        showSuccess,
        setShowSuccess,
        isSubmitting,
        setIsSubmitting,

        // Totals
        framesTotal,
        lensesTotal,

        // Handlers - Order Details
        handleOrderDetailsChange,

        // Handlers - Customer
        handleCustomerChange,

        // Handlers - Optometrist
        handleOptometristChange,

        // Handlers - Prescription
        handleRightEyeChange,
        handleLeftEyeChange,
        handlePDChange,
        handleNotesChange,

        // Handlers - Frames
        frames,
        handleAddFrame,
        handleUpdateFrame,
        handleRemoveFrame,

        // Handlers - Lenses
        lenses,
        handleAddLens,
        handleUpdateLens,
        handleRemoveLens,

        // Handlers - Bill
        bill,
        handleDiscountChange,
        handleDiscountTypeChange,
        handleAdvancePaymentChange,
        handlePaymentMethodChange,

        // Actions
        resetForm,
        createOrder
    };
};