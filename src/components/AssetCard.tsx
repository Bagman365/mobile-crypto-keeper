
import { Asset } from '@/lib/dummyData';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  className?: string;
}

const AssetCard = ({ asset, className }: AssetCardProps) => {
  const valueInUsd = asset.balance * asset.price;
  const isPositiveChange = asset.change24h >= 0;
  
  return (
    <div className={cn(
      "bg-wallet-card rounded-xl p-4 flex items-center justify-between card-shadow animate-fade-in",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-wallet-purple/10 flex items-center justify-center text-xl">
          {asset.logo}
        </div>
        <div>
          <h3 className="font-medium">{asset.name}</h3>
          <p className="text-sm text-wallet-text-secondary">{asset.symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-medium">{asset.balance.toFixed(2)} {asset.symbol}</p>
        <div className="flex items-center justify-end gap-1">
          <p className="text-sm text-wallet-text-secondary">${valueInUsd.toFixed(2)}</p>
          <span className={cn(
            "text-xs flex items-center",
            isPositiveChange ? "text-green-400" : "text-red-400"
          )}>
            {isPositiveChange ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(asset.change24h).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
