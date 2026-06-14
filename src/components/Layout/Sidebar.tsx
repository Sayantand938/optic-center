import React from 'react';
import { X, ChevronRight } from 'lucide-react';

interface MenuItem {
    id: number;
    label: string;
    screen: string;
    action: () => void;
}

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    menuItems: MenuItem[];
    onMenuItemClick: (action: () => void, screenName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, menuItems, onMenuItemClick }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full w-80 max-w-[85%] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Optical Store</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus:outline-none touch-manipulation"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <nav className="py-2">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => onMenuItemClick(item.action, item.screen)}
                            className={`w-full text-left px-6 py-4 text-gray-700 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 focus:outline-none touch-manipulation ${index !== menuItems.length - 1 ? 'border-b border-gray-50' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-base font-medium">{item.label}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-400 text-center">Optical Inventory PWA v1.0</p>
                </div>
            </div>
        </>
    );
};