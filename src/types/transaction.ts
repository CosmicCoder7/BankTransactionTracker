export type TransactionType = 'credit' | 'debit';
export type AccountType = 'HDFC' | 'BOB';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  account: AccountType;
  beforeBalance: number;
  currentBalance: number;
}

export interface TransactionFilters {
  timeframe: '1M' | '3M' | '6M' | 'custom';
  startDate?: string;
  endDate?: string;
}