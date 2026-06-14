import React from 'react';
import { Menu, Layers } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
    return (
        <main className="flex-1 flex items-center justify-center px-4 py-8" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="text-center w-full max-w-sm mx-auto">
                {/* Icon */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-inner">
                    <Layers className="w-14 h-14 text-blue-500" />
                </div>

                {/* Welcome Text */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2 tracking-tight">Welcome to Optical Store</h2>
                <p className="text-gray-500 text-sm mb-6">Your complete inventory management solution</p>

                {/* Subtle Hint - Removed font-mono class since JetBrains Mono is global */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                    <Menu className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Tap menu to get started</span>
                </div>
            </div>
        </main>
    );
};