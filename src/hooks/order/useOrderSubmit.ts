interface UseOrderSubmitProps {
    formData: any;
    createOrder: () => any;
    onSuccess: () => void;
    onError: (error: Error) => void;
}

export const useOrderSubmit = ({ formData, createOrder, onSuccess, onError }: UseOrderSubmitProps) => {
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

    const submitOrder = async () => {
        if (!validateForm()) return false;

        try {
            const newOrder = createOrder();
            onSuccess();
            console.log('Order created:', newOrder);
            return true;
        } catch (error) {
            console.error('Error creating order:', error);
            onError(error as Error);
            return false;
        }
    };

    return { submitOrder, validateForm };
};