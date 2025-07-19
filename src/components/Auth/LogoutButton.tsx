import React from 'react';
import { LogOut } from 'lucide-react';
import { useStore } from '../../store';

const LogoutButton: React.FC = () => {
    const { logoutFetch } = useStore();

    return (
        <button
            onClick={() => logoutFetch()}
            className="w-full flex items-center gap-1 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors hover:cursor-pointer rounded-lg"
        >
            <LogOut size={20} />
            Logout
        </button>
    );
};

export default LogoutButton;
