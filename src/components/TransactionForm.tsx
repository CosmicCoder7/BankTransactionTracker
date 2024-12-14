import React, { useState } from 'react';
import { AlertCircle, ArrowRightLeft } from 'lucide-react';
import { Transaction, TransactionType, AccountType } from '../types/transaction';
import { determineAccount, ACCOUNT_THRESHOLD, formatCurrency } from '../utils/transactionUtils';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'beforeBalance' | 'currentBalance'>) => void;
}

export default function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('credit');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const suggestedAccount = determineAccount(numAmount);
    
    setSelectedAccount(suggestedAccount);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedAccount) {
      onSubmit({
        type,
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        account: selectedAccount,
      });
      resetForm();
    }
  };

  const handleSwitchAccount = () => {
    setSelectedAccount(selectedAccount === 'HDFC' ? 'BOB' : 'HDFC');
  };

  const resetForm = () => {
    setAmount('');
    setType('credit');
    setShowConfirmation(false);
    setSelectedAccount(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Transaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Transaction
        </button>
      </form>

      {showConfirmation && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold dark:text-white">Confirm Transaction</h3>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="dark:text-gray-300">
                Transaction Details:
              </p>
              <ul className="text-sm space-y-1 dark:text-gray-400">
                <li>Amount: {formatCurrency(parseFloat(amount))}</li>
                <li>Type: {type.charAt(0).toUpperCase() + type.slice(1)}</li>
                <li>Selected Account: {selectedAccount}</li>
                <li className="text-xs text-gray-500">
                  {parseFloat(amount) > ACCOUNT_THRESHOLD 
                    ? "Amount exceeds ₹30,000 (HDFC recommended)" 
                    : "Amount is ₹30,000 or less (BOB recommended)"}
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={handleConfirm}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                Confirm Transaction
              </button>
              
              <button
                onClick={handleSwitchAccount}
                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2"
              >
                <ArrowRightLeft size={16} />
                Switch to {selectedAccount === 'HDFC' ? 'BOB' : 'HDFC'} Account
              </button>
              
              <button
                onClick={resetForm}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}