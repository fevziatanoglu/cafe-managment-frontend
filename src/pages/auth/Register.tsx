import RegisterForm from "../../components/Auth/RegisterForm";

export default function Register() {
    return (
        <div className="flex items-start pt-20 justify-center min-h-screen h-full bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="w-1/4  bg-white shadow-xl rounded-xl p-8 border border-amber-100">
                <RegisterForm />
            </div>
        </div>
    );
}
