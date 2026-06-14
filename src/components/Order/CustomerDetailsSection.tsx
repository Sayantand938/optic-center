import React from 'react';
import { User, Phone } from 'lucide-react';
import type { Gender, AgeGroup } from '../../types';

interface CustomerDetailsSectionProps {
    formData: {
        firstName: string;
        lastName: string;
        gender: Gender;
        ageGroup: AgeGroup;
        phoneNumber: string;
    };
    onChange: (field: string, value: any) => void;
}

export const CustomerDetailsSection: React.FC<CustomerDetailsSectionProps> = ({ formData, onChange }) => {
    const genderOptions: { value: Gender; label: string }[] = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    const ageGroupOptions: { value: AgeGroup; label: string }[] = [
        { value: '0-12', label: '0-12 years' },
        { value: '13-19', label: '13-19 years' },
        { value: '20-35', label: '20-35 years' },
        { value: '36-50', label: '36-50 years' },
        { value: '51-65', label: '51-65 years' },
        { value: '65+', label: '65+ years' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Customer Details
            </h3>

            <div className="space-y-3">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                    </label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => onChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                    </label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => onChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                    />
                </div>

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender *
                    </label>
                    <div className="flex gap-3">
                        {genderOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onChange('gender', option.value)}
                                className={`flex-1 px-4 py-2 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500/20 ${formData.gender === option.value
                                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium'
                                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Age Group */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age Group *
                    </label>
                    <select
                        value={formData.ageGroup}
                        onChange={(e) => onChange('ageGroup', e.target.value as AgeGroup)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                    >
                        <option value="">Select age group</option>
                        {ageGroupOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                    </label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="tel"
                            inputMode="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => onChange('phoneNumber', e.target.value)}
                            placeholder="+1234567890"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};