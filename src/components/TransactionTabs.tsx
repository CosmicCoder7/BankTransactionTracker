import React from 'react';
import { Building2, Wallet } from 'lucide-react';
import { AccountType } from '../types/transaction';

interface TransactionTabsProps {
  activeAccount: AccountType;
  onAccountChange: (account: AccountType) => void;
}

export default function TransactionTabs({ activeAccount, onAccountChange }: TransactionTabsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 mb-6">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onAccountChange('HDFC')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
            activeAccount === 'HDFC'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Building2 size={20} />
          <span className="font-medium">HDFC Account</span>
          <span className="text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded-full ml-2">
            Business
          </span>
        </button>

        <button
          onClick={() => onAccountChange('BOB')}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
            activeAccount === 'BOB'
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}
        >
          <Wallet size={20} />
          <span className="font-medium">BOB Account</span>
          <span className="text-xs bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full ml-2">
            Regular
          </span>
        </button>
      </div>
    </div>
  );
}