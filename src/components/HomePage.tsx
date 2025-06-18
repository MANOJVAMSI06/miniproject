import React from 'react';

interface HomePageProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/008/823/118/non_2x/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-blue-background-bullish-point-up-trend-of-graph-economy-design-vector.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-xl w-full px-6 py-10 backdrop-blur-md bg-white bg-opacity-10 border border-blue-400 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-blue-300 mb-4">
          Expense Tracker
        </h1>
        <p className="text-center text-lg text-gray-100 mb-8">
          Track your income and expenses effortlessly. Visualize your money,
          manage your spending, and plan smarter — all in one place.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={onLoginClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Login
          </button>
          <button
            onClick={onSignupClick}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
