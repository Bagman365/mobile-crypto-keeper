
import { Transaction } from '@/lib/dummyData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

const TransactionList = ({ transactions, className }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-wallet-text-secondary">
        No transactions yet
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const isSend = transaction.type === 'send';
  const date = new Date(transaction.date);
  const formattedDate = format(date, 'MMM d, yyyy');
  const formattedTime = format(date, 'h:mm a');
  
  return (
    <div className="bg-wallet-card rounded-xl p-3 flex items-center space-x-3">
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        isSend ? "bg-red-500/10" : "bg-green-500/10"
      )}>
        {isSend 
          ? <ArrowUpRight className="text-red-400" size={20} /> 
          : <ArrowDownLeft className="text-green-400" size={20} />
        }
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">
            {isSend ? 'Sent' : 'Received'} {transaction.asset}
          </h4>
          <p className={cn(
            "font-medium",
            isSend ? "text-red-400" : "text-green-400"
          )}>
            {isSend ? '-' : '+'}{transaction.amount} {transaction.asset}
          </p>
        </div>
        
        <div className="flex justify-between mt-1">
          <p className="text-xs text-wallet-text-secondary">
            {formattedDate} • {formattedTime}
          </p>
          <p className="text-xs text-wallet-text-secondary capitalize">
            {transaction.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
