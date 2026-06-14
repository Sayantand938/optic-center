interface UseOrderDetailsHandlersProps {
    setFormData: (fn: (prev: any) => any) => void;
    updateBill: () => void;
}

export const useOrderDetailsHandlers = ({ setFormData, updateBill }: UseOrderDetailsHandlersProps) => {
    const handleOrderDetailsChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            orderDetails: { ...prev.orderDetails, [field]: value }
        }));
        updateBill();
    };

    return { handleOrderDetailsChange };
};