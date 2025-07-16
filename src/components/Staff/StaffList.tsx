import { useEffect, useState } from 'react';
import { User, Edit, Trash2, Plus, Search, Filter, Coffee } from 'lucide-react';
import useStore from '../../store';
import StaffForm from './StaffForm';

export default function StaffList() {
    const {
        staff,
        getStaffFetch,
        deleteStaffFetch,
        setSelectedStaff,
        openModal
    } = useStore();

    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'waiter' | 'kitchen'>('all');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    // Load staff on component mount
    useEffect(() => {
        const loadStaff = async () => {
            setIsLoading(true);
            await getStaffFetch();
            setIsLoading(false);
        };
        loadStaff();
    }, [getStaffFetch]);



    const handleCreateStaff = () => {
        setSelectedStaff(null);
        openModal(
            <StaffForm mode="create" />,
            "Add New Staff Member"
        );
    };


    const handleDeleteStaff = async (id: string) => {
        if (!confirm('Are you sure you want to delete this staff member?')) return;

        setIsDeleting(id);
        const response = await deleteStaffFetch(id);

        if (response.success) {
            // Success handled by store
        } else {
            alert(response.message || 'Failed to delete staff member');
        }
        setIsDeleting(null);
    };

    // Filter staff based on search and role
    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || member.role === filterRole;
        return matchesSearch && matchesRole;
    });

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

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                        <User className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-amber-800">Staff Management</h2>
                        <p className="text-amber-600">Manage your café staff members</p>
                    </div>
                </div>
                <button
                    onClick={handleCreateStaff}
                    className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Staff</span>
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search staff by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-5 w-5" />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value as 'all' | 'waiter' | 'kitchen')}
                        className="pl-10 pr-8 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
                    >
                        <option value="all">All Roles</option>
                        <option value="waiter">Waiter</option>
                        <option value="kitchen">Kitchen</option>
                    </select>
                </div>
            </div>

            {/* Staff Count */}
            <div className="mb-4">
                <p className="text-sm text-amber-600">
                    Showing {filteredStaff.length} of {staff.length} staff members
                </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                    <span className="ml-2 text-amber-600">Loading staff...</span>
                </div>
            ) : (
                /* Staff List */
                <div className="space-y-3">
                    {filteredStaff.length === 0 ? (
                        <div className="text-center py-12">
                            <Coffee className="h-16 w-16 text-amber-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-amber-800 mb-2">No staff members found</h3>
                            <p className="text-amber-600 mb-4">
                                {searchTerm || filterRole !== 'all'
                                    ? 'Try adjusting your search or filter criteria.'
                                    : 'Get started by adding your first staff member.'
                                }
                            </p>
                            {!searchTerm && filterRole === 'all' && (
                                <button
                                    onClick={handleCreateStaff}
                                    className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    <Plus className="h-5 w-5" />
                                    <span>Add First Staff Member</span>
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredStaff.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center justify-between p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-amber-200 p-3 rounded-full">
                                        <User className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-amber-800">{member.username}</h4>
                                        <p className="text-sm text-amber-600">{member.email}</p>
                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleBadgeColor(member.role)}`}>
                                            {member.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => openModal(<StaffForm mode="edit" staff={member} />, `View ${member.username}`)}
                                        className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
                                        title="Edit staff member"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteStaff(member.id)}
                                        disabled={isDeleting === member.id}
                                        className={`p-2 rounded-lg transition-colors ${isDeleting === member.id
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-red-600 hover:text-red-800 hover:bg-red-100'
                                            }`}
                                        title="Delete staff member"
                                    >
                                        {isDeleting === member.id ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                                        ) : (
                                            <Trash2 className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
