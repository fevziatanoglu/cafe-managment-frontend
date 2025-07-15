import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Menu, X, User, LogOut, Settings } from 'lucide-react';
import useStore from '../../store';
import ProfileDropdown from './PorfileDropdown';

export default function AuthNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useStore();

  const navigationLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/orders' },
    { name: 'Tables', href: '/tables' },
    ...(user?.role === 'admin' ? [{ name: 'Menu', href: '/menu' }] : []),
  ];

  return (
    <nav className="bg-white border-b border-amber-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Coffee className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-xl font-bold text-amber-800">Café Manager</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-amber-700 hover:text-amber-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Profile */}
          <div className="hidden md:block">
            <ProfileDropdown />
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
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-amber-700 hover:text-amber-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Profile Section */}
              <div className="pt-4 border-t border-amber-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">{user?.username}</p>
                    <p className="text-xs text-amber-600 capitalize">{user?.role}</p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
