import React from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { OrderDetailsSection } from '../OrderDetailsSection';
import { CustomerDetailsSection } from '../CustomerDetailsSection';
import { OptometristDetailsSection } from '../OptometristDetailsSection';
import { EyePrescriptionSection } from '../EyePrescriptionSection';
import type { EyePrescription, PDMeasurements } from '../../../types';

interface OrderFormProps {
    formData: any;
    isSubmitting: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
    onOrderDetailsChange: (field: string, value: any) => void;
    onCustomerChange: (field: string, value: any) => void;
    onOptometristChange: (field: string, value: string) => void;
    onRightEyeChange: (field: keyof EyePrescription, value: string) => void;
    onLeftEyeChange: (field: keyof EyePrescription, value: string) => void;
    onPDChange: (field: keyof PDMeasurements, value: string) => void;
    onNotesChange: (notes: string) => void;
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
    onNotesChange
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