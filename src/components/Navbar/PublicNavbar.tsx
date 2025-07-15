import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import useStore from '../../store';
import AuthModal from '../Auth/AuthModal';

export default function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useStore();

  const handleAuthModal = (tab: 'login' | 'register') => {
    openModal(<AuthModal initialTab={tab} />, 'Authentication');
  };

  return (
    <nav className="bg-white border-b border-amber-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Coffee className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-xl font-bold text-amber-800">Café Manager</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-amber-700 hover:text-amber-900 transition-colors">
              Home
            </Link>
            <Link to="/publicmenu" className="text-amber-700 hover:text-amber-900 transition-colors">
              Menu
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleAuthModal('login')}
              className="text-amber-700 hover:text-amber-900 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => handleAuthModal('register')}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-amber-700 hover:bg-amber-50 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-amber-700 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/publicmenu"
                className="text-amber-700 hover:text-amber-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-amber-100">
                <button
                  onClick={() => {
                    handleAuthModal('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left text-amber-700 hover:text-amber-900 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    handleAuthModal('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-center"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
