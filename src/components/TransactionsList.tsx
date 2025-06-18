import React, { useState } from 'react';
import { Trash2, Filter, Search, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  theme: 'light' | 'dark';
}

const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  onDeleteTransaction, 
  theme 
}) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesFilter = filter === 'all' || transaction.type === filter;
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputClass = theme === 'dark' 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const cardClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className={`text-4xl font-bold ${textClass} mb-2`}>All Transactions</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {filteredTransactions.length} of {transactions.length} transactions
        </p>
      </div>

      {/* Filters and Search */}
      <div className={`${bgClass} rounded-2xl p-6 shadow-lg`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
              className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
            >
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className={`${bgClass} rounded-2xl p-12 shadow-lg text-center`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 ${cardClass} rounded-full mb-4`}>
            <Search className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
          </div>
          <h3 className={`text-xl font-semibold ${textClass} mb-2`}>No transactions found</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Start by adding your first transaction!'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`${bgClass} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-3 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold ${textClass} truncate`}>
                        {transaction.description}
                      </h3>
                      <p className={`font-bold text-lg ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.category}
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onDeleteTransaction(transaction.id)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;