
export interface Asset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
  change24h: number;
  logo: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: number;
  asset: string;
  date: string;
  address: string;
  status: 'completed' | 'pending' | 'failed';
}

// Sample wallet assets
export const assets: Asset[] = [
  {
    id: '1',
    name: 'Algorand',
    symbol: 'ALGO',
    balance: 145.8,
    price: 0.147,
    change24h: 2.5,
    logo: '🔷'
  },
  {
    id: '2',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 250.22,
    price: 1.0,
    change24h: 0.01,
    logo: '💵'
  },
  {
    id: '3',
    name: 'Pera Token',
    symbol: 'PERA',
    balance: 500,
    price: 0.05,
    change24h: -1.2,
    logo: '🟣'
  }
];

// Sample transaction history
export const transactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'receive',
    amount: 50,
    asset: 'ALGO',
    date: '2025-04-15T10:30:00',
    address: 'ALGO123...789',
    status: 'completed'
  },
  {
    id: 'tx2',
    type: 'send',
    amount: 25.5,
    asset: 'USDC',
    date: '2025-04-14T14:45:00',
    address: 'ALGO456...321',
    status: 'completed'
  },
  {
    id: 'tx3',
    type: 'receive',
    amount: 100,
    asset: 'PERA',
    date: '2025-04-13T09:15:00',
    address: 'ALGO789...654',
    status: 'completed'
  },
  {
    id: 'tx4',
    type: 'send',
    amount: 10,
    asset: 'ALGO',
    date: '2025-04-10T16:20:00',
    address: 'ALGO321...987',
    status: 'completed'
  }
];

// Wallet information
export const walletInfo = {
  name: 'My Wallet',
  address: 'ALGO1234567890ABCDEFGXYZ',
  totalBalance: 242.83, // in USD
  seedPhrase: 'test journey valley picture survey else fruit guide fat hope sample bird',
  isSetup: false // Change to true to bypass setup screen
};
