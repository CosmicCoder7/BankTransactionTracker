import React from 'react';
import { Transaction } from '../types/transaction';
import AccountSummary from './AccountSummary';

interface AccountsOverviewProps {
  transactions: Transaction[];
}

export default function AccountsOverview({ transactions }: AccountsOverviewProps) {
  return (
    <div>
      <AccountSummary account="HDFC" transactions={transactions} />
      <AccountSummary account="BOB" transactions={transactions} />
    </div>
  );
}