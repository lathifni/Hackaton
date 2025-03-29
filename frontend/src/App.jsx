import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import FarmerPage from './FarmerPage';
import CollectorPage from './CollectorPage';
import DistributorPage from './DistributorPage';
import SellerPage from './SellerPage';
import ConsumerPage from './ConsumerPage';

const App = () => {
  // State untuk menentukan komponen yang aktif
  const [activeComponent, setActiveComponent] = useState('welcome');

  // Fungsi untuk mengubah komponen yang aktif
  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  // Render komponen berdasarkan state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'farmer':
        return <FarmerPage onNavigate={handleNavigation} />;
      case 'collector':
        return <CollectorPage onNavigate={handleNavigation} />;
      case 'distributor':
        return <DistributorPage onNavigate={handleNavigation} />;
      case 'seller':
        return <SellerPage onNavigate={handleNavigation} />;
      case 'consumer':
        return <ConsumerPage onNavigate={handleNavigation} />;
      case 'welcome':
        return <WelcomePage onNavigate={handleNavigation} />;
      default:
        return <WelcomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
};

export default App;