interface UseOrderCustomerHandlersProps {
    setFormData: (fn: (prev: any) => any) => void;
}

export const useOrderCustomerHandlers = ({ setFormData }: UseOrderCustomerHandlersProps) => {
    const handleCustomerChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    return { handleCustomerChange };
};