import StaffList from "../../components/Staff/StaffList";

export default function Staff() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StaffList />
            </div>
        </div>
    );
}
