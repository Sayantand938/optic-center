interface UseOrderBillHandlersProps {
    formData: any;
    setFormData: (fn: (prev: any) => any) => void;
    updateBill: () => void;
}

export const useOrderBillHandlers = ({ formData, setFormData, updateBill }: UseOrderBillHandlersProps) => {
    const handleDiscountChange = (value: number) => {
        setFormData(prev => ({
            ...prev,
            bill: { ...prev.bill, discount: value }
        }));
        updateBill();
    };

    const handleDiscountTypeChange = (type: 'percentage' | 'fixed') => {
        setFormData(prev => ({
            ...prev,
            bill: { ...prev.bill, discountType: type, discount: 0 }
        }));
        updateBill();
    };

    const handleAdvancePaymentChange = (value: number) => {
        setFormData(prev => ({
            ...prev,
            bill: { ...prev.bill, advancePayment: value }
        }));
        updateBill();
    };

    const handlePaymentMethodChange = (method: 'cash' | 'card' | 'upi' | 'bank_transfer') => {
        setFormData(prev => ({
            ...prev,
            bill: { ...prev.bill, paymentMethod: method }
        }));
    };

    return {
        bill: formData.bill,
        handleDiscountChange,
        handleDiscountTypeChange,
        handleAdvancePaymentChange,
        handlePaymentMethodChange
    };
};