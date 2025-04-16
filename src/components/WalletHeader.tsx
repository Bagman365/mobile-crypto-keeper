
import { useState } from 'react';
import { Eye, EyeOff, CopyIcon, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { walletInfo } from '@/lib/dummyData';
import { useToast } from '@/components/ui/use-toast';

interface WalletHeaderProps {
  className?: string;
}

const WalletHeader = ({ className }: WalletHeaderProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };
  
  const copyAddress = () => {
    navigator.clipboard.writeText(walletInfo.address);
    toast({
      title: "Address copied!",
      description: "Wallet address copied to clipboard",
      duration: 2000,
    });
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh action
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed!",
        description: "Your wallet balance is updated",
        duration: 2000,
      });
    }, 1000);
  };

  return (
    <div className={cn("p-4 wallet-gradient rounded-b-3xl text-white", className)}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-bold">My Wallet</h1>
        <button 
          onClick={handleRefresh}
          className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
        >
          <RefreshCcw size={16} className={cn("text-white", isRefreshing && "animate-spin")} />
        </button>
      </div>
      
      <div className="flex flex-col mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">Total Balance</span>
          <button 
            onClick={toggleBalanceVisibility} 
            className="text-white/70 hover:text-white transition-colors"
          >
            {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
        </div>
        <h2 className="text-3xl font-bold mt-1">
          {showBalance ? `$${walletInfo.totalBalance.toFixed(2)}` : '••••••'}
        </h2>
      </div>
      
      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 mb-2">
        <div className="text-xs text-white/70 truncate flex-1">
          {walletInfo.address.substring(0, 8)}...{walletInfo.address.substring(walletInfo.address.length - 4)}
        </div>
        <button 
          onClick={copyAddress}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <CopyIcon size={14} />
        </button>
      </div>
    </div>
  );
};

export default WalletHeader;
