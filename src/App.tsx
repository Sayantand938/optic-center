import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { WelcomeScreen } from './components/UI/WelcomeScreen';
import { NewOrderScreen } from './components/Order/NewOrderScreen';
import { PendingOrdersScreen } from './components/Order/PendingOrdersScreen';
import { PendingPaymentScreen } from './components/Order/PendingPaymentScreen';
import { useMenu } from './hooks/useMenu';
import { menuItems } from './constants/menuItems';

const App: React.FC = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  const handleMenuItemClick = (action: () => void, screenName: string) => {
    action();
    setCurrentScreen(screenName);
    closeMenu();
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <WelcomeScreen />;
      case 'New Order':
        return <NewOrderScreen />;
      case 'Pending Orders':
        return <PendingOrdersScreen />;
      case 'Pending Payment':
        return <PendingPaymentScreen />;
      default:
        return (
          <main className="flex-1 flex items-center justify-center px-4 py-8" style={{ minHeight: 'calc(100vh - 56px)' }}>
            <div className="text-center">
              <p className="text-gray-500">{currentScreen} screen coming soon</p>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Sidebar
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuItems={menuItems}
        onMenuItemClick={handleMenuItemClick}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header onMenuClick={toggleMenu} currentScreen={currentScreen} />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;