
import { useState, useEffect } from 'react';
import { assets, transactions, walletInfo } from '@/lib/dummyData';
import WalletHeader from '@/components/WalletHeader';
import AssetCard from '@/components/AssetCard';
import TransactionList from '@/components/TransactionList';
import BottomNavigation from '@/components/BottomNavigation';
import WalletSetup from '@/components/WalletSetup';
import { Button } from '@/components/ui/button';
import { Plus, QrCode, ArrowUpRight, Filter } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('Wallet');
  const [isWalletSetupComplete, setIsWalletSetupComplete] = useState(walletInfo.isSetup);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleWalletSetupComplete = () => {
    setIsWalletSetupComplete(true);
  };
  
  if (!isWalletSetupComplete) {
    return (
      <div className="mobile-container bg-wallet-background">
        <WalletSetup onComplete={handleWalletSetupComplete} />
      </div>
    );
  }
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Wallet':
        return (
          <>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Assets</h2>
                <Button variant="outline" size="sm" className="text-wallet-purple border-wallet-purple">
                  <Plus size={16} className="mr-1" />
                  Add Asset
                </Button>
              </div>
              
              <div className="space-y-3 mb-6">
                {assets.map(asset => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-wallet-text-secondary">
                  <Filter size={16} className="mr-1" />
                  Filter
                </Button>
              </div>
              
              <TransactionList transactions={transactions.slice(0, 3)} />
              
              {transactions.length > 3 && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-wallet-purple"
                  onClick={() => setActiveTab('History')}
                >
                  View All Transactions
                </Button>
              )}
            </div>
          </>
        );
        
      case 'Scan':
        return (
          <div className="p-4 h-full flex flex-col items-center justify-center">
            <div className="bg-wallet-card rounded-xl p-6 w-full max-w-xs flex flex-col items-center">
              <QrCode size={180} className="text-wallet-purple mb-4" />
              <h2 className="text-xl font-bold mb-2">Scan QR Code</h2>
              <p className="text-wallet-text-secondary text-center text-sm">
                Scan a QR code to send funds or connect to a dApp
              </p>
            </div>
          </div>
        );
        
      case 'Send':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Send Assets</h2>
            <div className="bg-wallet-card rounded-xl p-4 mb-4">
              <h3 className="text-sm text-wallet-text-secondary mb-2">Select Asset</h3>
              <div className="space-y-2">
                {assets.map(asset => (
                  <div key={asset.id} className="flex items-center justify-between p-2 hover:bg-wallet-background/50 rounded-lg cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-wallet-purple/10 flex items-center justify-center">
                        {asset.logo}
                      </div>
                      <div>
                        <p className="font-medium">{asset.name}</p>
                        <p className="text-xs text-wallet-text-secondary">Balance: {asset.balance} {asset.symbol}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-wallet-text-secondary" />
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-wallet-purple hover:bg-wallet-dark-purple">
              Continue
            </Button>
          </div>
        );
        
      case 'History':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <TransactionList transactions={transactions} />
          </div>
        );
        
      case 'Settings':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div className="bg-wallet-card rounded-xl divide-y divide-wallet-background/20">
              <div className="p-4 hover:bg-wallet-background/5 transition-colors">
                <h3 className="font-medium">Security</h3>
                <p className="text-sm text-wallet-text-secondary">Manage security settings</p>
              </div>
              <div className="p-4 hover:bg-wallet-background/5 transition-colors">
                <h3 className="font-medium">Network</h3>
                <p className="text-sm text-wallet-text-secondary">Change blockchain network</p>
              </div>
              <div className="p-4 hover:bg-wallet-background/5 transition-colors">
                <h3 className="font-medium">Backup</h3>
                <p className="text-sm text-wallet-text-secondary">View recovery phrase</p>
              </div>
              <div className="p-4 hover:bg-wallet-background/5 transition-colors">
                <h3 className="font-medium">About</h3>
                <p className="text-sm text-wallet-text-secondary">App version & info</p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="mobile-container bg-wallet-background">
      {activeTab === 'Wallet' && <WalletHeader />}
      
      {activeTab !== 'Wallet' && (
        <div className="wallet-gradient p-4">
          <h1 className="text-xl font-bold text-white">{activeTab}</h1>
        </div>
      )}
      
      <div className="pb-20">
        {renderActiveTab()}
      </div>
      
      <BottomNavigation onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
