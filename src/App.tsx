import React, { useState, useEffect } from 'react';
import { Transaction, User, AppState } from './types';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionsList from './components/TransactionsList';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './components/HomePage'; // ✅ New import

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    amount: 3500,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
    date: new Date().toISOString()
  },
  {
    id: '2',
    amount: 85,
    category: 'Food',
    type: 'expense',
    description: 'Groceries for the week',
    date: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    amount: 1200,
    category: 'Freelance',
    type: 'income',
    description: 'Website development project',
    date: new Date(Date.now() - 172800000).toISOString()
  }
];

function App() {
  const [appState, setAppState] = useState<AppState>({
    transactions: INITIAL_TRANSACTIONS,
    currentUser: null,
    currentView: 'home', // ✅ Start at Home page
    theme: 'light',
    authMode: 'login'
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('expense-tracker-theme') as 'light' | 'dark';
    const savedTransactions = localStorage.getItem('expense-tracker-transactions');
    const savedUser = localStorage.getItem('expense-tracker-user');

    setAppState(prev => ({
      ...prev,
      theme: savedTheme || 'light',
      transactions: savedTransactions ? JSON.parse(savedTransactions) : INITIAL_TRANSACTIONS,
      currentUser: savedUser ? JSON.parse(savedUser) : null,
      currentView: savedUser ? 'dashboard' : 'home' // ✅ Back to home if no user
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem('expense-tracker-theme', appState.theme);
    localStorage.setItem('expense-tracker-transactions', JSON.stringify(appState.transactions));
    if (appState.currentUser) {
      localStorage.setItem('expense-tracker-user', JSON.stringify(appState.currentUser));
    }
  }, [appState.theme, appState.transactions, appState.currentUser]);

  useEffect(() => {
    if (appState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appState.theme]);

  const handleAuth = (userData: { name?: string; email: string; password: string }) => {
    const user: User = {
      id: Date.now().toString(),
      name: userData.name || userData.email.split('@')[0],
      email: userData.email
    };

    setAppState(prev => ({
      ...prev,
      currentUser: user,
      currentView: 'dashboard'
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('expense-tracker-user');
    setAppState(prev => ({
      ...prev,
      currentUser: null,
      currentView: 'home',
      authMode: 'login'
    }));
  };

  const handleToggleAuthMode = () => {
    setAppState(prev => ({
      ...prev,
      authMode: prev.authMode === 'login' ? 'register' : 'login'
    }));
  };

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setAppState(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
      currentView: 'dashboard'
    }));
  };

  const handleDeleteTransaction = (id: string) => {
    setAppState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id)
    }));
  };

  const handleNavigate = (view: 'dashboard' | 'add-transaction' | 'transactions') => {
    setAppState(prev => ({ ...prev, currentView: view }));
  };

  const handleToggleTheme = () => {
    setAppState(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'home':
        return (
          <HomePage
            onLoginClick={() =>
              setAppState(prev => ({ ...prev, currentView: 'auth', authMode: 'login' }))
            }
            onSignupClick={() =>
              setAppState(prev => ({ ...prev, currentView: 'auth', authMode: 'register' }))
            }
          />
        );
      case 'auth':
        return (
          <AuthForm
            mode={appState.authMode}
            onSubmit={handleAuth}
            onToggleMode={handleToggleAuthMode}
            theme={appState.theme}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            transactions={appState.transactions}
            theme={appState.theme}
          />
        );
      case 'add-transaction':
        return (
          <AddTransaction
            onAddTransaction={handleAddTransaction}
            theme={appState.theme}
          />
        );
      case 'transactions':
        return (
          <TransactionsList
            transactions={appState.transactions}
            onDeleteTransaction={handleDeleteTransaction}
            theme={appState.theme}
          />
        );
      default:
        return null;
    }
  };

  const bgClass = appState.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle theme={appState.theme} onToggle={handleToggleTheme} />
      </div>

      {appState.currentUser && (
        <Navigation
          currentView={appState.currentView}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          theme={appState.theme}
        />
      )}

      <main className={`${appState.currentUser ? 'pt-8 pb-8 px-4 sm:px-6 lg:px-8' : ''}`}>
        <div className={`${appState.currentUser ? 'max-w-7xl mx-auto' : ''}`}>
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}

export default App;
