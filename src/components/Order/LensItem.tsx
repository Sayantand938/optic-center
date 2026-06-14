import React from 'react';
import { Trash2, Eye } from 'lucide-react';
import type { LensItem, LensCategory, LensMaterial, LensSide } from '../../types';

interface LensItemProps {
    item: LensItem;
    index: number;
    onUpdate: (id: string, field: keyof LensItem, value: any) => void;
    onRemove: (id: string) => void;
}

const categoryOptions: { value: LensCategory; label: string }[] = [
    { value: 'distance', label: 'Distance' },
    { value: 'near', label: 'Near' },
    { value: 'bifocal', label: 'Bifocal' },
    { value: 'progressive', label: 'Progressive' }
];

const materialOptions: { value: LensMaterial; label: string }[] = [
    { value: 'mineral', label: 'Mineral Glass' },
    { value: 'plastic', label: 'Plastic' },
    { value: 'contact', label: 'Contact Lens' },
    { value: 'trivex', label: 'Trivex' },
    { value: 'organic', label: 'Organic' },
    { value: 'polycarbonate', label: 'Polycarbonate' }
];

const sideOptions: { value: LensSide; label: string }[] = [
    { value: 'both', label: 'Both Eyes' },
    { value: 'right', label: 'Right Eye Only' },
    { value: 'left', label: 'Left Eye Only' }
];

export const LensItemComponent: React.FC<LensItemProps> = ({ item, index, onUpdate, onRemove }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-500" />
                    Lens #{index + 1}
                </h4>
                <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                    <select
                        value={item.category}
                        onChange={(e) => onUpdate(item.id, 'category', e.target.value as LensCategory)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        {categoryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Material *</label>
                    <select
                        value={item.material}
                        onChange={(e) => onUpdate(item.id, 'material', e.target.value as LensMaterial)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        {materialOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Side *</label>
                    <select
                        value={item.side}
                        onChange={(e) => onUpdate(item.id, 'side', e.target.value as LensSide)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        {sideOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company Name *</label>
                    <input
                        type="text"
                        value={item.companyName}
                        onChange={(e) => onUpdate(item.id, 'companyName', e.target.value)}
                        placeholder="e.g., Essilor, Zeiss"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                    <input
                        type="text"
                        value={item.productName}
                        onChange={(e) => onUpdate(item.id, 'productName', e.target.value)}
                        placeholder="e.g., Crizal, Transitions"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Index</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={item.index}
                        onChange={(e) => onUpdate(item.id, 'index', e.target.value)}
                        placeholder="e.g., 1.56, 1.61, 1.67"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">DIA (mm)</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={item.dia}
                        onChange={(e) => onUpdate(item.id, 'dia', e.target.value)}
                        placeholder="e.g., 70, 75"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Price *</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        value={item.price}
                        onChange={(e) => onUpdate(item.id, 'price', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Quantity *</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={item.quantity}
                        onChange={(e) => onUpdate(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        placeholder="1"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>
            </div>
        </div>
    );
};