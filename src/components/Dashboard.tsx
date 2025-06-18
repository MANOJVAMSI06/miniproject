import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Transaction } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  theme: 'light' | 'dark';
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, theme }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  const stats = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      color: balance >= 0 ? 'from-green-400 to-emerald-500' : 'from-red-400 to-pink-500',
      textColor: balance >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'from-purple-400 to-pink-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className={`text-4xl font-bold ${textClass} mb-2`}>Dashboard</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Your financial overview at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`${cardClass} rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <DollarSign className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            </div>
            <h3 className={`text-lg font-semibold ${textClass} mb-2`}>{stat.title}</h3>
            <p className={`text-3xl font-bold ${stat.textColor}`}>
              ${Math.abs(stat.amount).toLocaleString()}
              {stat.title === 'Total Balance' && stat.amount < 0 && ' (-)'}
            </p>
          </div>
        ))}
      </div>

      <div className={`${bgClass} rounded-2xl p-6 shadow-lg`}>
        <h2 className={`text-2xl font-bold ${textClass} mb-4`}>Recent Activity</h2>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className={`mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} size={48} />
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              No transactions yet. Start by adding your first income or expense!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 ${cardClass} rounded-xl transition-all duration-300 hover:shadow-md`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  <div>
                    <p className={`font-semibold ${textClass}`}>{transaction.description}</p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;