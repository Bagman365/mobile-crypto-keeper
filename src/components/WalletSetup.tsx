import { useState } from 'react';
import { Clipboard, Copy, Eye, EyeOff, Info, Lock, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { walletInfo } from '@/lib/dummyData';

interface WalletSetupProps {
  onComplete: () => void;
  className?: string;
}

const WalletSetup = ({ onComplete, className }: WalletSetupProps) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'create' | 'backup'>('welcome');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const { toast } = useToast();
  
  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(walletInfo.seedPhrase);
    toast({
      title: "Seed phrase copied!",
      description: "Make sure to store it in a safe place",
      duration: 3000,
    });
  };
  
  const seedPhraseWords = walletInfo.seedPhrase.split(' ');
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
              <Wallet size={32} className="text-wallet-purple" />
            </div>
            <h2 className="text-2xl font-bold">Welcome to Crypto Keeper</h2>
            <p className="text-wallet-text-secondary">
              Your secure mobile crypto wallet for managing digital assets
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Button 
                className="bg-wallet-purple hover:bg-wallet-dark-purple" 
                onClick={() => setCurrentStep('create')}
              >
                Create New Wallet
              </Button>
              <Button 
                variant="outline" 
                className="border-wallet-purple text-wallet-purple hover:bg-wallet-purple/10"
              >
                Import Existing Wallet
              </Button>
            </div>
          </div>
        );
        
      case 'create':
        return (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
              <Lock size={32} className="text-wallet-purple" />
            </div>
            <h2 className="text-2xl font-bold text-center">Wallet Created!</h2>
            <div className="bg-wallet-card rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm text-wallet-text-secondary">Wallet Address</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletInfo.address);
                    toast({ title: "Address copied!" });
                  }}
                  className="text-wallet-purple"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-xs bg-wallet-background/50 p-2 rounded break-all">
                {walletInfo.address}
              </p>
            </div>
            <Button 
              className="w-full bg-wallet-purple hover:bg-wallet-dark-purple" 
              onClick={() => setCurrentStep('backup')}
            >
              Continue to Backup
            </Button>
          </div>
        );
        
      case 'backup':
        return (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
              <Clipboard size={32} className="text-wallet-purple" />
            </div>
            <h2 className="text-2xl font-bold text-center">Backup Your Wallet</h2>
            <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm flex gap-2">
              <Info size={18} />
              <p>Never share your seed phrase with anyone!</p>
            </div>
            <div className="relative">
              <div className="bg-wallet-card rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-wallet-text-secondary">Recovery Seed Phrase</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      className="text-wallet-purple"
                    >
                      {showSeedPhrase ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={handleCopySeedPhrase}
                      className="text-wallet-purple"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                {showSeedPhrase ? (
                  <div className="grid grid-cols-3 gap-2">
                    {seedPhraseWords.map((word, index) => (
                      <div 
                        key={index}
                        className="bg-wallet-background/50 p-2 rounded text-xs text-center flex items-center gap-1"
                      >
                        <span className="text-wallet-text-secondary">{index + 1}.</span> {word}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-24 flex items-center justify-center">
                    <button 
                      onClick={() => setShowSeedPhrase(true)}
                      className="text-wallet-purple underline text-sm"
                    >
                      Tap to reveal seed phrase
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Button 
              className="w-full bg-wallet-purple hover:bg-wallet-dark-purple" 
              onClick={onComplete}
            >
              I've Saved My Seed Phrase
            </Button>
          </div>
        );
    }
  };
  
  return (
    <div className={cn("p-6 h-full flex flex-col justify-center", className)}>
      {renderStepContent()}
    </div>
  );
};

export default WalletSetup;
