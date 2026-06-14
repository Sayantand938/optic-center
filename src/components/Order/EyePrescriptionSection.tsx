import React from 'react';
import { Eye, Ruler, Target, EyeOff, ScanLine, Droplet, Sparkles } from 'lucide-react';
import { PDMeasurementSection } from './PDMeasurementSection';
import { PrescriptionNotesSection } from './PrescriptionNotesSection';
import type { EyePrescription, PDMeasurements } from '../../types';

interface EyePrescriptionSectionProps {
    rightEye: EyePrescription;
    leftEye: EyePrescription;
    pd: PDMeasurements;
    notes?: string;
    onRightEyeChange: (field: keyof EyePrescription, value: string) => void;
    onLeftEyeChange: (field: keyof EyePrescription, value: string) => void;
    onPDChange: (field: keyof PDMeasurements, value: string) => void;
    onNotesChange: (notes: string) => void;
}

export const EyePrescriptionSection: React.FC<EyePrescriptionSectionProps> = ({
    rightEye,
    leftEye,
    pd,
    notes = '',
    onRightEyeChange,
    onLeftEyeChange,
    onPDChange,
    onNotesChange
}) => {
    const prescriptionFields = [
        { key: 'sph', label: 'SPH', icon: Ruler, placeholder: '-2.00', inputMode: 'decimal' as const },
        { key: 'cyl', label: 'CYL', icon: Target, placeholder: '-0.50', inputMode: 'decimal' as const },
        { key: 'axis', label: 'Axis', icon: Eye, placeholder: '180', inputMode: 'numeric' as const },
        { key: 'va', label: 'VA', icon: EyeOff, placeholder: '6/6', inputMode: 'text' as const },
        { key: 'd', label: 'D', icon: ScanLine, placeholder: '-2.00', inputMode: 'decimal' as const },
        { key: 'n', label: 'N', icon: ScanLine, placeholder: '-1.50', inputMode: 'decimal' as const },
        { key: 'add', label: 'ADD', icon: Sparkles, placeholder: '+2.00', inputMode: 'decimal' as const },
        { key: 'cl', label: 'CL', icon: Droplet, placeholder: '-2.00', inputMode: 'decimal' as const }
    ] as const;

    const renderEyeColumn = (
        eye: 'right' | 'left',
        eyeData: EyePrescription,
        onChange: (field: keyof EyePrescription, value: string) => void
    ) => {
        const isRight = eye === 'right';
        const eyeColor = isRight ? 'from-blue-50 to-indigo-50' : 'from-purple-50 to-pink-50';
        const eyeIcon = isRight ? <Eye className="w-5 h-5 text-blue-600" /> : <EyeOff className="w-5 h-5 text-purple-600" />;
        const eyeTitle = isRight ? 'Right Eye (OD)' : 'Left Eye (OS)';

        return (
            <div className={`flex-1 bg-gradient-to-br ${eyeColor} rounded-xl p-4 border border-gray-200`}>
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    {eyeIcon}
                    <h4 className="font-semibold text-gray-800">{eyeTitle}</h4>
                </div>
                <div className="space-y-3">
                    {prescriptionFields.map((field) => {
                        const Icon = field.icon;
                        return (
                            <div key={field.key}>
                                <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
                                    <Icon className="w-3 h-3" />
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    inputMode={field.inputMode}
                                    value={eyeData[field.key]}
                                    onChange={(e) => onChange(field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-500" />
                Eye Prescription
            </h3>

            {/* Two Column Layout for Eyes */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {renderEyeColumn('right', rightEye, onRightEyeChange)}
                {renderEyeColumn('left', leftEye, onLeftEyeChange)}
            </div>

            {/* PD Measurements Section */}
            <PDMeasurementSection pd={pd} onChange={onPDChange} />

            {/* Notes Section */}
            <PrescriptionNotesSection notes={notes} onChange={onNotesChange} />
        </div>
    );
};