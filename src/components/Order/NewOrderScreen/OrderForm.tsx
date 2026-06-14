import React from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { OrderDetailsSection } from '../OrderDetailsSection';
import { CustomerDetailsSection } from '../CustomerDetailsSection';
import { OptometristDetailsSection } from '../OptometristDetailsSection';
import { EyePrescriptionSection } from '../EyePrescriptionSection';
import { PurchaseDetailsSection } from '../PurchaseDetailsSection';
import { BillDetailsSection } from '../BillDetailsSection';
import type { EyePrescription, PDMeasurements, FrameItem, LensItem, BillDetails } from '../../../types';

interface OrderFormProps {
    formData: any;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
    // Order Details
    onOrderDetailsChange: (field: string, value: any) => void;
    // Customer Details
    onCustomerChange: (field: string, value: any) => void;
    // Optometrist Details
    onOptometristChange: (field: string, value: string) => void;
    // Prescription
    onRightEyeChange: (field: keyof EyePrescription, value: string) => void;
    onLeftEyeChange: (field: keyof EyePrescription, value: string) => void;
    onPDChange: (field: keyof PDMeasurements, value: string) => void;
    onNotesChange: (notes: string) => void;
    // Purchase
    frames: FrameItem[];
    lenses: LensItem[];
    onAddFrame: () => void;
    onAddLens: () => void;
    onUpdateFrame: (id: string, field: keyof FrameItem, value: any) => void;
    onUpdateLens: (id: string, field: keyof LensItem, value: any) => void;
    onRemoveFrame: (id: string) => void;
    onRemoveLens: (id: string) => void;
    // Bill
    bill: BillDetails;
    framesTotal: number;
    lensesTotal: number;
    onDiscountChange: (value: number) => void;
    onDiscountTypeChange: (type: 'percentage' | 'fixed') => void;
    onAdvancePaymentChange: (value: number) => void;
    onPaymentMethodChange: (method: 'cash' | 'card' | 'upi' | 'bank_transfer') => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
    formData,
    isSubmitting,
    onSubmit,
    onReset,
    onOrderDetailsChange,
    onCustomerChange,
    onOptometristChange,
    onRightEyeChange,
    onLeftEyeChange,
    onPDChange,
    onNotesChange,
    frames,
    lenses,
    onAddFrame,
    onAddLens,
    onUpdateFrame,
    onUpdateLens,
    onRemoveFrame,
    onRemoveLens,
    bill,
    framesTotal,
    lensesTotal,
    onDiscountChange,
    onDiscountTypeChange,
    onAdvancePaymentChange,
    onPaymentMethodChange
}) => {
    return (
        <form onSubmit={onSubmit} className="px-4 max-w-4xl mx-auto">
            <OrderDetailsSection
                formData={formData.orderDetails}
                onChange={onOrderDetailsChange}
            />

            <CustomerDetailsSection
                formData={formData.customer}
                onChange={onCustomerChange}
            />

            <OptometristDetailsSection
                formData={formData.optometrist}
                onChange={onOptometristChange}
            />

            <EyePrescriptionSection
                rightEye={formData.prescription.rightEye}
                leftEye={formData.prescription.leftEye}
                pd={formData.prescription.pd}
                notes={formData.prescription.notes}
                onRightEyeChange={onRightEyeChange}
                onLeftEyeChange={onLeftEyeChange}
                onPDChange={onPDChange}
                onNotesChange={onNotesChange}
            />

            <PurchaseDetailsSection
                frames={frames}
                lenses={lenses}
                onAddFrame={onAddFrame}
                onAddLens={onAddLens}
                onUpdateFrame={onUpdateFrame}
                onUpdateLens={onUpdateLens}
                onRemoveFrame={onRemoveFrame}
                onRemoveLens={onRemoveLens}
            />

            <BillDetailsSection
                bill={bill}
                framesTotal={framesTotal}
                lensesTotal={lensesTotal}
                onDiscountChange={onDiscountChange}
                onDiscountTypeChange={onDiscountTypeChange}
                onAdvancePaymentChange={onAdvancePaymentChange}
                onPaymentMethodChange={onPaymentMethodChange}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 mb-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500/20"
                >
                    <Save className="w-5 h-5" />
                    {isSubmitting ? 'Creating...' : 'Create Order'}
                </button>

                <button
                    type="button"
                    onClick={onReset}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 active:bg-gray-400 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-500/20"
                >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                </button>
            </div>
        </form>
    );
};