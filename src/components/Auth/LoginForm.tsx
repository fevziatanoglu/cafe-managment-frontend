import { useForm } from 'react-hook-form';
import useStore from '../../store';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '../../validations/authSchema';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import ErrorBox from './ErrorBox';


export default function LoginForm({ onSuccess }: { onSuccess?: () => void; }) {
    const { loginFetch } = useStore();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginFetch(data);
            if (response.success) {
                onSuccess?.();
            } else {
                setError(response.message || "Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            {!onSuccess && (
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-amber-100 p-3 rounded-full">
                            <Coffee className="h-8 w-8 text-amber-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-amber-800 mb-2">Welcome Back</h2>
                    <p className="text-amber-600">Sign in to your café account</p>
                </div>
            )}

            {error && <ErrorBox message={error} />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="on">
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-amber-400" />
                        </div>
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="username"
                            className={`
                            w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                            ${errors.email
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-amber-300 hover:border-amber-400 focus:bg-white'
                                }
                        `}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-medium text-amber-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-amber-400" />
                        </div>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            className={`
                            w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
                            ${errors.password
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-amber-300 hover:border-amber-400 focus:bg-white'
                                }
                        `}
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-400 hover:text-amber-600 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <span className="mr-1">⚠️</span>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                    w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200
                    ${isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 transform hover:scale-[1.02] active:scale-[0.98]'
                        }
                    focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
                `}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Signing in...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <Coffee className="h-5 w-5 mr-2" />
                            Sign In
                        </div>
                    )}
                </button>
            </form>

            {/* Sign Up Link - only show if not in modal */}
            {!onSuccess && (
                <div className="mt-8 text-center">
                    <p className="text-sm text-amber-600">
                        Don't have an account?{' '}
                        <Link to={"/register"} className="text-amber-700 hover:text-amber-800 font-medium transition-colors underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            )}
        </div>


    );
}
