import React from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { PDMeasurements } from '../../types';

interface PDMeasurementSectionProps {
    pd: PDMeasurements;
    onChange: (field: keyof PDMeasurements, value: string) => void;
}

export const PDMeasurementSection: React.FC<PDMeasurementSectionProps> = ({ pd, onChange }) => {
    return (
        <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
                <MoveHorizontal className="w-5 h-5 text-blue-500" />
                <h4 className="font-semibold text-gray-800">Pupillary Distance (PD)</h4>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Right Eye PD (mm)
                    </label>
                    <input
                        type="text"
                        value={pd.right}
                        onChange={(e) => onChange('right', e.target.value)}
                        placeholder="32.0"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Left Eye PD (mm)
                    </label>
                    <input
                        type="text"
                        value={pd.left}
                        onChange={(e) => onChange('left', e.target.value)}
                        placeholder="32.0"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                        Total PD (mm)
                    </label>
                    <input
                        type="text"
                        value={pd.total}
                        onChange={(e) => onChange('total', e.target.value)}
                        placeholder="64.0"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                    />
                </div>
            </div>
        </div>
    );
};