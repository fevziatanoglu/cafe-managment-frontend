import { useState } from 'react';
import { User, Edit, Trash2, Mail, Calendar } from 'lucide-react';
import useStore from '../../store';
import StaffForm from './StaffForm';
import type { STAFF } from '../../types';

interface StaffItemProps {
    staff: STAFF;
}

export default function StaffItem({ staff }: StaffItemProps) {
    const { deleteStaffFetch, openModal } = useStore();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = () => {
        openModal(
            <StaffForm mode="edit" staff={staff} />,
            `Edit ${staff.username}`
        );
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this staff member?')) return;

        setIsDeleting(true);
        const response = await deleteStaffFetch(staff._id);

        if (!response.success) {
            alert(response.message || 'Failed to delete staff member');
        }
        setIsDeleting(false);
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'waiter':
                return 'bg-blue-100 text-blue-800';
            case 'kitchen':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'waiter':
                return '🍽️';
            case 'kitchen':
                return '👨‍🍳';
            default:
                return '👤';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex">
                {/* Left side - Image and basic info */}
                <div className="w-32 bg-gradient-to-br from-amber-500 to-orange-600 p-4 flex flex-col items-center justify-center text-white">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 overflow-hidden">
                        {staff.image ? (
                            <img
                                src={staff.image}
                                alt={staff.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={32} className="text-white/80" />
                        )}
                    </div>
                    <div className="text-center">
                        <div className="text-xs font-medium opacity-90 mb-1">ID: {staff._id.slice(-6).toUpperCase()}</div>
                        <div className="text-xs opacity-75 flex items-center gap-1">
                            <Calendar size={10} />
                            {staff.createdAt ? new Date(staff.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: '2-digit'
                            }) : 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Right side - Staff details */}
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{staff.username}</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{getRoleIcon(staff.role)}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(staff.role)}`}>
                                    {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEdit}
                                className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Edit staff"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Delete staff"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} className="text-gray-400" />
                            <span>{staff.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                            <span>Active Employee</span>
                        </div>
                    </div>

                    {/* Bottom stripe with company branding */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">CAFÉ MANAGEMENT</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isDeleting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-gray-600">Deleting...</div>
                </div>
            )}
        </div>
    );
}
