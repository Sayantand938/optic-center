import React from 'react';
import { FileText } from 'lucide-react';

interface PrescriptionNotesSectionProps {
    notes: string;
    onChange: (notes: string) => void;
}

export const PrescriptionNotesSection: React.FC<PrescriptionNotesSectionProps> = ({ notes, onChange }) => {
    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                Additional Notes
            </label>
            <textarea
                value={notes}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter any additional notes about the prescription..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
        </div>
    );
};