
import { cn } from '@/lib/utils';
import { QrCode, Send, Wallet, History, Settings } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Wallet', icon: Wallet },
  { name: 'Scan', icon: QrCode },
  { name: 'Send', icon: Send },
  { name: 'History', icon: History },
  { name: 'Settings', icon: Settings },
];

interface BottomNavigationProps {
  className?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNavigation = ({ className, onTabChange }: BottomNavigationProps) => {
  const [activeTab, setActiveTab] = useState('Wallet');
  
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (onTabChange) {
      onTabChange(tabName);
    }
  };
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-wallet-card border-t border-wallet-purple/10 flex justify-around py-3 px-2",
      "max-w-screen-sm mx-auto",
      className
    )}>
      {navItems.map((item) => (
        <button
          key={item.name}
          className={cn(
            "flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors",
            activeTab === item.name 
              ? "text-wallet-purple" 
              : "text-wallet-text-secondary hover:text-wallet-text"
          )}
          onClick={() => handleTabChange(item.name)}
        >
          <item.icon size={20} className={cn(
            activeTab === item.name && "text-wallet-purple"
          )} />
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
