import React from 'react';
import { Trash2, Eye } from 'lucide-react';
import type { FrameItem, FrameType } from '../../types';

interface FrameItemProps {
    item: FrameItem;
    index: number;
    onUpdate: (id: string, field: keyof FrameItem, value: any) => void;
    onRemove: (id: string) => void;
}

const frameTypeOptions: { value: FrameType; label: string }[] = [
    { value: '3-piece/rimless', label: '3-Piece / Rimless' },
    { value: 'half-rimless/supra', label: 'Half Rimless / Supra' },
    { value: 'full-metal', label: 'Full Metal' },
    { value: 'full-shell/plastic', label: 'Full Shell / Plastic' },
    { value: 'goggles', label: 'Goggles' }
];

export const FrameItemComponent: React.FC<FrameItemProps> = ({ item, index, onUpdate, onRemove }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200">
            <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    Frame #{index + 1}
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">Frame Type *</label>
                    <select
                        value={item.type}
                        onChange={(e) => onUpdate(item.id, 'type', e.target.value as FrameType)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    >
                        {frameTypeOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Model Name *</label>
                    <input
                        type="text"
                        value={item.modelName}
                        onChange={(e) => onUpdate(item.id, 'modelName', e.target.value)}
                        placeholder="e.g., Ray-Ban 2140"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Model Code</label>
                    <input
                        type="text"
                        value={item.modelCode}
                        onChange={(e) => onUpdate(item.id, 'modelCode', e.target.value)}
                        placeholder="e.g., RB2140-901"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Model Color</label>
                    <input
                        type="text"
                        value={item.modelColor}
                        onChange={(e) => onUpdate(item.id, 'modelColor', e.target.value)}
                        placeholder="e.g., Black, Tortoise"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Model Size</label>
                    <input
                        type="text"
                        inputMode="text"
                        value={item.modelSize}
                        onChange={(e) => onUpdate(item.id, 'modelSize', e.target.value)}
                        placeholder="e.g., 52-18-145"
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