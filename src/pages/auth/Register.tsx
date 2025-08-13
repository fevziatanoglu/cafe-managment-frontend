import { Coffee } from "lucide-react";
import RegisterAndCafeFlow from "../../components/Auth/RegisterAndCafeFlow";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="flex items-start pt-20 justify-center min-h-screen h-full bg-gradient-to-br from-amber-50 to-orange-100">
            <div className="w-1/4  bg-white shadow-xl rounded-xl p-8 border border-amber-100">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                            <Coffee className="h-8 w-8 text-amber-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-amber-800 mb-2">Join Our Café</h2>
                    <p className="text-amber-600">Create your account today</p>
                </div>
                
                <RegisterAndCafeFlow />

                <div className="mt-8 text-center">
                    <p className="text-sm text-amber-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-amber-700 hover:text-amber-800 font-medium transition-colors underline">
                            Sign in here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
