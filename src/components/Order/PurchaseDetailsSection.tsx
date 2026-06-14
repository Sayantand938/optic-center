import React from 'react';
import { ShoppingCart, Plus, Package, Eye } from 'lucide-react';
import { FrameItemComponent } from './FrameItem';
import { LensItemComponent } from './LensItem';
import type { FrameItem, LensItem } from '../../types';

interface PurchaseDetailsSectionProps {
    frames: FrameItem[];
    lenses: LensItem[];
    onAddFrame: () => void;
    onAddLens: () => void;
    onUpdateFrame: (id: string, field: keyof FrameItem, value: any) => void;
    onUpdateLens: (id: string, field: keyof LensItem, value: any) => void;
    onRemoveFrame: (id: string) => void;
    onRemoveLens: (id: string) => void;
}

export const PurchaseDetailsSection: React.FC<PurchaseDetailsSectionProps> = ({
    frames,
    lenses,
    onAddFrame,
    onAddLens,
    onUpdateFrame,
    onUpdateLens,
    onRemoveFrame,
    onRemoveLens
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                Purchase Details
            </h3>

            {/* Frames Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-500" />
                        Frames
                    </h4>
                    <button
                        type="button"
                        onClick={onAddFrame}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-3 h-3" />
                        Add Frame
                    </button>
                </div>
                {frames.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">No frames added. Click "Add Frame" to add.</p>
                ) : (
                    frames.map((frame, idx) => (
                        <FrameItemComponent
                            key={frame.id}
                            item={frame}
                            index={idx}
                            onUpdate={onUpdateFrame}
                            onRemove={onRemoveFrame}
                        />
                    ))
                )}
            </div>

            {/* Lenses Section */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-500" />
                        Lenses
                    </h4>
                    <button
                        type="button"
                        onClick={onAddLens}
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
                    >
                        <Plus className="w-3 h-3" />
                        Add Lens
                    </button>
                </div>
                {lenses.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">No lenses added. Click "Add Lens" to add.</p>
                ) : (
                    lenses.map((lens, idx) => (
                        <LensItemComponent
                            key={lens.id}
                            item={lens}
                            index={idx}
                            onUpdate={onUpdateLens}
                            onRemove={onRemoveLens}
                        />
                    ))
                )}
            </div>
        </div>
    );
};