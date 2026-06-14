interface UseOrderPrescriptionHandlersProps {
    setFormData: (fn: (prev: any) => any) => void;
}

export const useOrderPrescriptionHandlers = ({ setFormData }: UseOrderPrescriptionHandlersProps) => {
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

    return {
        handleRightEyeChange,
        handleLeftEyeChange,
        handlePDChange,
        handleNotesChange
    };
};