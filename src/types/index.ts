export interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppState {
  transactions: Transaction[];
  currentUser: User | null;
  currentView: 'auth' | 'dashboard' | 'add-transaction' | 'transactions';
  theme: 'light' | 'dark';
  authMode: 'login' | 'register';
}