import { useState } from 'react';
import { Coffee } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import useStore from '../../store';

export default function AuthModal({initialTab = 'login'} : {initialTab?: 'login' | 'register'}) {
  const { closeModal } = useStore();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {/* Header with tabs */}
      <div className="border-b border-amber-100 -mx-6 mb-6">
        <div className="flex">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
              activeTab === 'login'
                ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50'
                : 'text-gray-500 hover:text-amber-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
              activeTab === 'register'
                ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50'
                : 'text-gray-500 hover:text-amber-600'
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <Coffee className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          {activeTab === 'login' ? 'Welcome Back' : 'Join Our Café'}
        </h2>
        <p className="text-amber-600">
          {activeTab === 'login' ? 'Sign in to your account' : 'Create your account today'}
        </p>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'login' ? (
          <LoginForm onSuccess={closeModal} />
        ) : (
          <RegisterForm onSuccess={closeModal} />
        )}
      </div>
    </div>
  );
}
