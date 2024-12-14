import React from 'react';
import { Transaction, AccountType } from '../types/transaction';
import { formatCurrency } from '../utils/transactionUtils';

interface AccountSummaryProps {
  account: AccountType;
  transactions: Transaction[];
}

export default function AccountSummary({ account, transactions }: AccountSummaryProps) {
  const accountTransactions = transactions.filter(t => t.account === account);
  const currentBalance = accountTransactions.length > 0 
    ? accountTransactions[accountTransactions.length - 1].currentBalance 
    : 0;

  const totalCredits = accountTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = accountTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">{account} Account Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-200">Current Balance</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-100">
            {formatCurrency(currentBalance)}
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-200">Total Credits</p>
          <p className="text-2xl font-bold text-green-700 dark:text-green-100">
            {formatCurrency(totalCredits)}
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-200">Total Debits</p>
          <p className="text-2xl font-bold text-red-700 dark:text-red-100">
            {formatCurrency(totalDebits)}
          </p>
        </div>
      </div>
    </div>
  );
}