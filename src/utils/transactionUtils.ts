import { Transaction, AccountType, TransactionType } from '../types/transaction';

export const ACCOUNT_THRESHOLD = 30000;

export const generateTransactionId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const determineAccount = (amount: number): AccountType => {
  return amount > ACCOUNT_THRESHOLD ? 'HDFC' : 'BOB';
};

export const calculateNewBalance = (
  currentBalance: number,
  amount: number,
  type: TransactionType
): number => {
  return type === 'credit' ? currentBalance + amount : currentBalance - amount;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};