import { Transaction } from '../types/transaction';

export const exportToCSV = (transactions: Transaction[]): void => {
  const csv = [
    ['Date', 'Type', 'Amount', 'Account', 'Before Balance', 'Current Balance'].join(','),
    ...transactions.map((t) =>
      [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.amount,
        t.account,
        t.beforeBalance,
        t.currentBalance,
      ].join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};