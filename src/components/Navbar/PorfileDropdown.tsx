import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings } from 'lucide-react';
import useStore from '../../store';
import LogoutButton from '../Auth/LogoutButton';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
      >
        <div className="bg-amber-100 p-2 rounded-full">
          <User className="h-5 w-5 text-amber-600" />
        </div>
        <span className="text-sm font-medium">{user?.username}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-amber-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-amber-100">
            <p className="text-sm font-medium text-amber-800">{user?.username}</p>
            <p className="text-xs text-amber-600">{user?.email}</p>
            <p className="text-xs text-amber-500 capitalize">{user?.role}</p>
          </div>

          <button className="w-full flex items-center space-x-2 px-4 py-2 text-amber-700 hover:bg-amber-50 transition-colors">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>

          <LogoutButton />
        </div>
      )}
    </div>
  );
}
