import React from 'react';
import { TransactionFilters } from './types/transaction';
import { filterTransactions } from './utils/filterUtils';
import { exportToCSV } from './utils/exportUtils';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AccountsOverview from './components/AccountsOverview';
import TransactionTabs from './components/TransactionTabs';
import { TransactionFilters as TransactionFiltersComponent } from './components/TransactionFilters';
import { useTransactions } from './hooks/useTransactions';
import { useAccountSelection } from './hooks/useAccountSelection';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [activeAccount, setActiveAccount] = useAccountSelection();
  const [darkMode, setDarkMode] = useDarkMode();
  const [filters, setFilters] = React.useState<TransactionFilters>({
    timeframe: '1M',
  });

  const filteredTransactions = filterTransactions(transactions, filters).filter(
    (t) => t.account === activeAccount
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
          onExport={() => exportToCSV(filteredTransactions)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AccountsOverview transactions={filterTransactions(transactions, filters)} />
          <TransactionForm 
            onSubmit={addTransaction}
            onAccountChange={setActiveAccount}
          />
        </div>

        <TransactionTabs
          activeAccount={activeAccount}
          onAccountChange={setActiveAccount}
        />

        <div className="mt-8">
          <TransactionFiltersComponent
            filters={filters}
            onFilterChange={setFilters}
          />
          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
          />
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p className="text-gray-500 dark:text-gray-400">
                No transactions found for {activeAccount} account in the selected time period.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;