import React, { useState } from 'react';
import { Plus, DollarSign, Tag, FileText } from 'lucide-react';
import { Transaction } from '../types';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  theme: 'light' | 'dark';
}

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction, theme }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
    expense: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTransaction({
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      description: formData.description.trim()
    });

    setFormData({
      amount: '',
      category: '',
      type: 'expense',
      description: ''
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && { category: '' }) // Reset category when type changes
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputClass = theme === 'dark' 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const cardClass = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center">
        <h1 className={`text-4xl font-bold ${textClass} mb-2`}>Add Transaction</h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Track your income and expenses
        </p>
      </div>

      <div className={`${bgClass} rounded-2xl p-8 shadow-lg`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-600 rounded-xl p-1">
            {['income', 'expense'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: type } } as any)}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  formData.type === type
                    ? type === 'income'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-red-500 text-white shadow-lg'
                    : `${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
                }`}
              >
                {type === 'income' ? '💰 Income' : '💸 Expense'}
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="relative">
            <label className={`block text-sm font-semibold ${textClass} mb-2`}>
              Amount
            </label>
            <div className="relative">
              <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  errors.amount ? 'border-red-500 ring-2 ring-red-200' : ''
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="relative">
            <label className={`block text-sm font-semibold ${textClass} mb-2`}>
              Category
            </label>
            <div className="relative">
              <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  errors.category ? 'border-red-500 ring-2 ring-red-200' : ''
                }`}
              >
                <option value="">Select a category</option>
                {categories[formData.type].map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="relative">
            <label className={`block text-sm font-semibold ${textClass} mb-2`}>
              Description
            </label>
            <div className="relative">
              <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                name="description"
                placeholder="What was this for?"
                value={formData.description}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                  errors.description ? 'border-red-500 ring-2 ring-red-200' : ''
                }`}
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
              formData.type === 'income'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
            } text-white`}
          >
            <Plus size={20} />
            <span>Add {formData.type === 'income' ? 'Income' : 'Expense'}</span>
          </button>
        </form>
      </div>

      {/* Quick Tips */}
      <div className={`${cardClass} rounded-xl p-6`}>
        <h3 className={`font-semibold ${textClass} mb-3`}>💡 Quick Tips</h3>
        <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>• Use clear descriptions to easily identify transactions later</li>
          <li>• Categorize accurately for better expense tracking</li>
          <li>• Add transactions regularly to maintain accurate records</li>
        </ul>
      </div>
    </div>
  );
};

export default AddTransaction;

