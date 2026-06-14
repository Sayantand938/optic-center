interface UseOrderOptometristHandlersProps {
    setFormData: (fn: (prev: any) => any) => void;
}

export const useOrderOptometristHandlers = ({ setFormData }: UseOrderOptometristHandlersProps) => {
    const handleOptometristChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            optometrist: { ...prev.optometrist, [field]: value }
        }));
    };

    return { handleOptometristChange };
};