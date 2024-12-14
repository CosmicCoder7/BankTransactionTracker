import { AccountType } from '../types/transaction';
import { useLocalStorage } from './useLocalStorage';

export function useAccountSelection() {
  const [activeAccount, setActiveAccount] = useLocalStorage<AccountType>('activeAccount', 'HDFC');
  return [activeAccount, setActiveAccount] as const;
}