import { useEffect, useState } from 'react';
import { Coffee } from 'lucide-react';
import useStore from '../../store';
import StaffForm from './StaffForm';
import StaffItem from './StaffItem';
import StaffItemSkeleton from './StaffItemSkeleton';
import { GenericFilter, type FilterOption } from '../Common/GenericFilter';
import type { STAFF } from '../../types';

export default function StaffList() {
    const {
        staff,
        getStaffFetch,
        isStaffLoading,
        openModal
    } = useStore();

    const [selectedRole, setSelectedRole] = useState<'all' | 'waiter' | 'kitchen'>('all');
    const [sortBy, setSortBy] = useState<'username' | 'email' | 'role' | 'createdAt'>('username');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');

    // Load staff on component mount
    useEffect(() => {
        getStaffFetch();
    }, [getStaffFetch]);

    const sortOptions = [
        { value: 'username', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'role', label: 'Role' },
        { value: 'createdAt', label: 'Date Added' }
    ];

    const roleOptions: FilterOption<'all' | 'waiter' | 'kitchen'>[] = [
        { 
            value: 'all', 
            label: 'All Roles', 
            count: staff.length, 
            color: 'bg-gray-100 text-gray-700 hover:bg-gray-200', 
            icon: '👥' 
        },
        { 
            value: 'waiter', 
            label: 'Waiters', 
            count: staff.filter(s => s.role === 'waiter').length, 
            color: 'bg-blue-100 text-blue-700 hover:bg-blue-200', 
            icon: '🍽️' 
        },
        { 
            value: 'kitchen', 
            label: 'Kitchen', 
            count: staff.filter(s => s.role === 'kitchen').length, 
            color: 'bg-green-100 text-green-700 hover:bg-green-200', 
            icon: '👨‍🍳' 
        }
    ];

    const onRoleChange = (role: 'all' | 'waiter' | 'kitchen') => {
        setSelectedRole(role);
    };

    // Filter and sort staff
    let filteredStaff = staff.filter(member => {
        const matchesSearch = 
            member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || member.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    filteredStaff = filteredStaff.sort((a: STAFF, b: STAFF) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (sortOrder === 'asc') return aValue.localeCompare(bValue);
            else return bValue.localeCompare(aValue);
        }
        return 0;
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <GenericFilter
                options={roleOptions}
                selected={selectedRole}
                onChange={onRoleChange}
                onOpenModal={() => openModal(<StaffForm mode="create" />, "Add New Staff Member")}
                createLabel="Add Staff"
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={(value: string) => setSortBy(value as "username" | "email" | "role" | "createdAt")}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                sortOptions={sortOptions}
            />

            <div className="mb-4">
                <p className="text-sm text-amber-600">
                    Showing {filteredStaff.length} of {staff.length} staff members
                </p>
            </div>

            {isStaffLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((index) => (
                        <StaffItemSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStaff.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <Coffee className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-amber-800 mb-2">No staff members found</h3>
                            <p className="text-amber-600 mb-4">
                                {searchTerm || selectedRole !== 'all'
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Get started by adding your first staff member.'
                                }
                            </p>
                        </div>
                    ) : (
                        filteredStaff.map((member) => (
                            <StaffItem key={member._id} staff={member} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
