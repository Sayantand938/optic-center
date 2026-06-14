import React from 'react';
import { Stethoscope, UserCircle, Hospital, Calendar } from 'lucide-react';

interface OptometristDetailsSectionProps {
    formData: {
        eyeCheckupDate: string;
        doctorName: string;
        hospitalName: string;
    };
    onChange: (field: string, value: string) => void;
}

export const OptometristDetailsSection: React.FC<OptometristDetailsSectionProps> = ({ formData, onChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-blue-500" />
                Eye Examination Details
            </h3>

            <div className="space-y-3">
                {/* Eye Checkup Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Eye Checkup Date *
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="date"
                            value={formData.eyeCheckupDate}
                            onChange={(e) => onChange('eyeCheckupDate', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Doctor/Optometrist Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doctor/Optometrist Name *
                    </label>
                    <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={formData.doctorName}
                            onChange={(e) => onChange('doctorName', e.target.value)}
                            placeholder="Dr. John Doe"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>
                </div>

                {/* Hospital/Clinic Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital/Clinic Name *
                    </label>
                    <div className="relative">
                        <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={formData.hospitalName}
                            onChange={(e) => onChange('hospitalName', e.target.value)}
                            placeholder="City Eye Hospital"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};