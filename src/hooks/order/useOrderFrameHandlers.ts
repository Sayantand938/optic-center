import { defaultFrame } from '../../constants/orderConstants';
import type { FrameItem } from '../../types';

interface UseOrderFrameHandlersProps {
    formData: any;
    setFormData: (fn: (prev: any) => any) => void;
    updateBill: () => void;
}

export const useOrderFrameHandlers = ({ formData, setFormData, updateBill }: UseOrderFrameHandlersProps) => {
    const handleAddFrame = () => {
        const newFrame: FrameItem = {
            ...defaultFrame,
            id: `frame-${Date.now()}-${Math.random()}`
        };
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: [...prev.purchase.frames, newFrame]
            }
        }));
        updateBill();
    };

    const handleUpdateFrame = (id: string, field: keyof FrameItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: prev.purchase.frames.map((frame: FrameItem) =>
                    frame.id === id ? { ...frame, [field]: value } : frame
                )
            }
        }));
        updateBill();
    };

    const handleRemoveFrame = (id: string) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: prev.purchase.frames.filter((frame: FrameItem) => frame.id !== id)
            }
        }));
        updateBill();
    };

    return {
        frames: formData.purchase.frames,
        handleAddFrame,
        handleUpdateFrame,
        handleRemoveFrame
    };
};