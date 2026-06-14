import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
    currentScreen: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentScreen }) => {
    return (
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex items-center shadow-sm">
            {/* Left: Burger Menu */}
            <button
                onClick={onMenuClick}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus:outline-none touch-manipulation"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Center: Current Screen Name */}
            <div className="flex-1 flex justify-center">
                <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
                    {currentScreen}
                </h1>
            </div>

            {/* Right: Empty placeholder for balance */}
            <div className="w-10"></div>
        </header>
    );
};