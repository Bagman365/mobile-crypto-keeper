
import { useState } from 'react';
import { Clipboard, Copy, Eye, EyeOff, Info, Lock, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { walletInfo } from '@/lib/dummyData';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';

interface WalletSetupProps {
  onComplete: () => void;
  className?: string;
}

const WalletSetup = ({ onComplete, className }: WalletSetupProps) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'create' | 'backup'>('welcome');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [agreedToBackup, setAgreedToBackup] = useState(false);
  const [animateIn, setAnimateIn] = useState(true);
  const { toast } = useToast();
  
  const handleCopySeedPhrase = () => {
    navigator.clipboard.writeText(walletInfo.seedPhrase);
    toast({
      title: "Seed phrase copied!",
      description: "Make sure to store it in a safe place",
      duration: 3000,
    });
  };
  
  const goToNextStep = (nextStep: 'welcome' | 'create' | 'backup') => {
    setAnimateIn(false);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setAnimateIn(true);
    }, 300);
  };
  
  const seedPhraseWords = walletInfo.seedPhrase.split(' ');
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className={`text-center space-y-6 transition-all duration-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-20 h-20 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
              <Wallet size={36} className="text-wallet-purple" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Crypto Keeper</h2>
              <p className="text-wallet-text-secondary mt-2">
                Secure, simple, seamless crypto wallet
              </p>
            </div>
            <div className="space-y-3 pt-6">
              <Button 
                className="w-full bg-wallet-purple hover:bg-wallet-dark-purple shadow-sm py-6 rounded-xl" 
                onClick={() => goToNextStep('create')}
              >
                Create New Wallet
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-wallet-purple text-wallet-purple hover:bg-wallet-purple/10 py-6 rounded-xl"
              >
                Import Existing Wallet
              </Button>
            </div>
            
            <div className="text-xs text-wallet-text-secondary mt-8 px-6">
              By proceeding, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        );
        
      case 'create':
        return (
          <div className={`space-y-6 transition-all duration-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
                <Lock size={36} className="text-wallet-purple" />
              </div>
              <h2 className="text-2xl font-bold mt-4">Your Wallet is Ready</h2>
              <p className="text-wallet-text-secondary mt-2">
                Your secure wallet has been created
              </p>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-md">
              <CardContent className="p-0">
                <div className="bg-wallet-purple/5 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Wallet Address</h3>
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
                  <p className="text-xs font-mono mt-2 bg-wallet-card/80 p-3 rounded-lg break-all">
                    {walletInfo.address}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-wallet-purple hover:bg-wallet-dark-purple shadow-sm py-6 rounded-xl" 
                onClick={() => goToNextStep('backup')}
              >
                Continue to Backup
              </Button>
            </div>
          </div>
        );
        
      case 'backup':
        return (
          <div className={`space-y-6 transition-all duration-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-wallet-purple/20 mx-auto flex items-center justify-center">
                <Clipboard size={36} className="text-wallet-purple" />
              </div>
              <h2 className="text-2xl font-bold mt-4">Secure Your Wallet</h2>
              <p className="text-wallet-text-secondary mt-2">
                Save these recovery words in a secure location
              </p>
            </div>
            
            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-sm flex gap-2 items-start">
              <Info size={20} className="shrink-0 mt-0.5" />
              <p>Never share your recovery phrase with anyone or enter it into any app or website.</p>
            </div>
            
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <div className="bg-wallet-card shadow-sm rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Recovery Phrase</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                        className="text-wallet-purple rounded-full p-1 hover:bg-wallet-purple/10"
                      >
                        {showSeedPhrase ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={handleCopySeedPhrase}
                        className="text-wallet-purple rounded-full p-1 hover:bg-wallet-purple/10"
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {!showSeedPhrase && (
                    <div className="h-20 flex items-center justify-center">
                      <button 
                        onClick={() => setShowSeedPhrase(true)}
                        className="text-wallet-purple underline text-sm"
                      >
                        Tap to reveal recovery phrase
                      </button>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                {showSeedPhrase && (
                  <div className="mt-3 grid grid-cols-3 gap-2 px-1">
                    {seedPhraseWords.map((word, index) => (
                      <div 
                        key={index}
                        className="bg-wallet-background/70 p-2 rounded-lg text-xs text-center flex items-center gap-1 shadow-sm"
                      >
                        <span className="text-wallet-text-secondary">{index + 1}.</span> 
                        <span className="font-medium">{word}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex items-start space-x-2 bg-wallet-card/50 p-4 rounded-xl">
              <Checkbox 
                id="confirm-backup" 
                checked={agreedToBackup}
                onCheckedChange={(checked) => setAgreedToBackup(checked as boolean)}
                className="data-[state=checked]:bg-wallet-purple data-[state=checked]:border-wallet-purple" 
              />
              <label 
                htmlFor="confirm-backup"
                className="text-sm leading-tight cursor-pointer"
              >
                I have securely saved my recovery phrase and understand that it cannot be recovered if lost
              </label>
            </div>
            
            <Button 
              className="w-full bg-wallet-purple hover:bg-wallet-dark-purple shadow-sm py-6 rounded-xl" 
              onClick={onComplete}
              disabled={!agreedToBackup}
            >
              Finish Setup
            </Button>
          </div>
        );
    }
  };
  
  return (
    <div className={cn("p-6 h-full flex flex-col justify-center max-w-md mx-auto", className)}>
      {renderStepContent()}
    </div>
  );
};

export default WalletSetup;
