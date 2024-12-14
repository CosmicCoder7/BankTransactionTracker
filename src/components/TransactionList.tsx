import React from 'react';
import { Transaction } from '../types/transaction';
import { formatCurrency } from '../utils/transactionUtils';
import { ArrowUpRight, ArrowDownRight, Building2, Wallet } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-all hover:shadow-lg border-l-4 ${
            transaction.account === 'HDFC'
              ? 'border-blue-500'
              : 'border-green-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'credit' 
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
              }`}>
                {transaction.type === 'credit' ? <ArrowUpRight /> : <ArrowDownRight />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold dark:text-white">
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.account === 'HDFC' ? <Building2 size={14} /> : <Wallet size={14} />}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Before: {formatCurrency(transaction.beforeBalance)}
              </p>
              <p className="text-sm font-medium dark:text-white">
                After: {formatCurrency(transaction.currentBalance)}
              </p>
            </div>
            <button
              onClick={() => onDelete(transaction.id)}
              className="ml-4 text-red-600 hover:text-red-800 dark:hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}