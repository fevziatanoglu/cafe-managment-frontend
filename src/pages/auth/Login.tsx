import LoginForm from "../../components/Auth/LoginForm";

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white shadow-xl rounded-xl p-8 border border-amber-100">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
