import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { Order, FrameItem, LensItem } from '../../../types';
import { OrderDetailsSection } from '../OrderDetailsSection';
import { CustomerDetailsSection } from '../CustomerDetailsSection';
import { OptometristDetailsSection } from '../OptometristDetailsSection';
import { EyePrescriptionSection } from '../EyePrescriptionSection';
import { PurchaseDetailsSection } from '../PurchaseDetailsSection';
import { BillDetailsSection } from '../BillDetailsSection';

interface OrderEditFormProps {
    order: Order;
    onSave: (updatedData: Partial<Order>) => void;
    onCancel: () => void;
}

export const OrderEditForm: React.FC<OrderEditFormProps> = ({ order, onSave, onCancel }) => {
    const [formData, setFormData] = useState(order);

    // Order Details Handlers
    const handleOrderDetailsChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            orderDetails: { ...prev.orderDetails, [field]: value }
        }));
    };

    // Customer Handlers
    const handleCustomerChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    // Optometrist Handlers
    const handleOptometristChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            optometrist: { ...prev.optometrist, [field]: value }
        }));
    };

    // Prescription Handlers
    const handleRightEyeChange = (field: keyof typeof formData.prescription.rightEye, value: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                rightEye: { ...prev.prescription.rightEye, [field]: value }
            }
        }));
    };

    const handleLeftEyeChange = (field: keyof typeof formData.prescription.leftEye, value: string) => {
        setFormData(prev => ({
            ...prev,
            prescription: {
                ...prev.prescription,
                leftEye: { ...prev.prescription.leftEye, [field]: value }
            }
        }));
    };

    const handlePDChange = (field: keyof typeof formData.prescription.pd, value: string) => {
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

    // Frame management
    const handleAddFrame = () => {
        const newFrame: FrameItem = {
            id: `frame-${Date.now()}`,
            type: 'full-metal',
            modelName: '',
            modelCode: '',
            modelColor: '',
            modelSize: '',
            price: 0,
            quantity: 1
        };
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: [...prev.purchase.frames, newFrame]
            }
        }));
    };

    const handleUpdateFrame = (id: string, field: keyof FrameItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: prev.purchase.frames.map(frame =>
                    frame.id === id ? { ...frame, [field]: value } : frame
                )
            }
        }));
    };

    const handleRemoveFrame = (id: string) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                frames: prev.purchase.frames.filter(frame => frame.id !== id)
            }
        }));
    };

    // Lens management
    const handleAddLens = () => {
        const newLens: LensItem = {
            id: `lens-${Date.now()}`,
            category: 'distance',
            material: 'plastic',
            side: 'both',
            companyName: '',
            productName: '',
            index: '',
            dia: '',
            price: 0,
            quantity: 1
        };
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: [...prev.purchase.lenses, newLens]
            }
        }));
    };

    const handleUpdateLens = (id: string, field: keyof LensItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: prev.purchase.lenses.map(lens =>
                    lens.id === id ? { ...lens, [field]: value } : lens
                )
            }
        }));
    };

    const handleRemoveLens = (id: string) => {
        setFormData(prev => ({
            ...prev,
            purchase: {
                ...prev.purchase,
                lenses: prev.purchase.lenses.filter(lens => lens.id !== id)
            }
        }));
    };

    // Bill management
    const handleDiscountChange = (value: number) => {
        const newBill = { ...formData.bill, discount: value };
        const discountAmount = newBill.discountType === 'percentage'
            ? (formData.bill.subtotal * value / 100)
            : value;
        newBill.finalAmount = formData.bill.subtotal - discountAmount;
        newBill.balanceDue = newBill.finalAmount - newBill.advancePayment;
        setFormData(prev => ({ ...prev, bill: newBill }));
    };

    const handleDiscountTypeChange = (type: 'percentage' | 'fixed') => {
        const newBill = { ...formData.bill, discountType: type, discount: 0 };
        newBill.finalAmount = formData.bill.subtotal;
        newBill.balanceDue = newBill.finalAmount - newBill.advancePayment;
        setFormData(prev => ({ ...prev, bill: newBill }));
    };

    const handleAdvancePaymentChange = (value: number) => {
        const newBill = { ...formData.bill, advancePayment: value };
        newBill.balanceDue = newBill.finalAmount - value;
        setFormData(prev => ({ ...prev, bill: newBill }));
    };

    const handlePaymentMethodChange = (method: 'cash' | 'card' | 'upi' | 'bank_transfer') => {
        setFormData(prev => ({
            ...prev,
            bill: { ...prev.bill, paymentMethod: method }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const framesTotal = formData.purchase.frames.reduce((sum, f) => sum + (f.price * f.quantity), 0);
    const lensesTotal = formData.purchase.lenses.reduce((sum, l) => sum + (l.price * l.quantity), 0);

    return (
        <form onSubmit={handleSubmit} className="px-4 max-w-4xl mx-auto">
            {/* Direct component usage - no wrappers needed! */}
            <OrderDetailsSection
                formData={formData.orderDetails}
                onChange={handleOrderDetailsChange}
            />

            <CustomerDetailsSection
                formData={formData.customer}
                onChange={handleCustomerChange}
            />

            <OptometristDetailsSection
                formData={formData.optometrist}
                onChange={handleOptometristChange}
            />

            <EyePrescriptionSection
                rightEye={formData.prescription.rightEye}
                leftEye={formData.prescription.leftEye}
                pd={formData.prescription.pd}
                notes={formData.prescription.notes}
                onRightEyeChange={handleRightEyeChange}
                onLeftEyeChange={handleLeftEyeChange}
                onPDChange={handlePDChange}
                onNotesChange={handleNotesChange}
            />

            <PurchaseDetailsSection
                frames={formData.purchase.frames}
                lenses={formData.purchase.lenses}
                onAddFrame={handleAddFrame}
                onAddLens={handleAddLens}
                onUpdateFrame={handleUpdateFrame}
                onUpdateLens={handleUpdateLens}
                onRemoveFrame={handleRemoveFrame}
                onRemoveLens={handleRemoveLens}
            />

            <BillDetailsSection
                bill={formData.bill}
                framesTotal={framesTotal}
                lensesTotal={lensesTotal}
                onDiscountChange={handleDiscountChange}
                onDiscountTypeChange={handleDiscountTypeChange}
                onAdvancePaymentChange={handleAdvancePaymentChange}
                onPaymentMethodChange={handlePaymentMethodChange}
            />

            <div className="flex gap-3 mt-6 mb-8">
                <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                    <X className="w-5 h-5" />
                    Cancel
                </button>
            </div>
        </form>
    );
};