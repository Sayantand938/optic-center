import { defaultLens } from '../../constants/orderConstants';
import type { LensItem } from '../../types';

interface UseOrderLensHandlersProps {
    formData: any;
    setFormData: (fn: (prev: any) => any) => void;
    updateBill: () => void;
}

export const useOrderLensHandlers = ({ formData, setFormData, updateBill }: UseOrderLensHandlersProps) => {
    const handleAddLens = () => {
        const newLens: LensItem = {
            ...defaultLens,
            id: `lens-${Date.now()}-${Math.random()}`
        };
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: [...prev.purchase.lenses, newLens]
            }
        }));
        updateBill();
    };

    const handleUpdateLens = (id: string, field: keyof LensItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: prev.purchase.lenses.map((lens: LensItem) =>
                    lens.id === id ? { ...lens, [field]: value } : lens
                )
            }
        }));
        updateBill();
    };

    const handleRemoveLens = (id: string) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: prev.purchase.lenses.filter((lens: LensItem) => lens.id !== id)
            }
        }));
        updateBill();
    };

    return {
        lenses: formData.purchase.lenses,
        handleAddLens,
        handleUpdateLens,
        handleRemoveLens
    };
};