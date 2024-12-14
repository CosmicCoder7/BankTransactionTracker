import { useCallback } from 'react';
import { Transaction } from '../types/transaction';
import { useLocalStorage } from './useLocalStorage';
import { calculateNewBalance, generateTransactionId } from '../utils/transactionUtils';

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

  const addTransaction = useCallback((
    newTransaction: Omit<Transaction, 'id' | 'beforeBalance' | 'currentBalance'>
  ) => {
    setTransactions(currentTransactions => {
      const accountTransactions = currentTransactions.filter(
        t => t.account === newTransaction.account
      );
      const beforeBalance = accountTransactions.length
        ? accountTransactions[accountTransactions.length - 1].currentBalance
        : 0;
      const currentBalance = calculateNewBalance(
        beforeBalance,
        newTransaction.amount,
        newTransaction.type
      );

      const transaction: Transaction = {
        ...newTransaction,
        id: generateTransactionId(),
        beforeBalance,
        currentBalance,
      };

      return [...currentTransactions, transaction];
    });
  }, [setTransactions]);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(currentTransactions => 
      currentTransactions.filter(t => t.id !== id)
    );
  }, [setTransactions]);

  return {
    transactions,
    addTransaction,
    deleteTransaction
  };
}