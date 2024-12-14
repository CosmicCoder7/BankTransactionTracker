import { Transaction, TransactionFilters } from '../types/transaction';

export const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (filters.timeframe === 'custom' && filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      return transactionDate >= start && transactionDate <= end;
    }

    const months = {
      '1M': 1,
      '3M': 3,
      '6M': 6,
    }[filters.timeframe] || 1;

    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    return transactionDate >= cutoff;
  });
};