import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, UserCheck, ChevronDown } from 'lucide-react';
import useStore from '../../store';
import type { STAFF } from '../../types/Staff';
import { createStaffSchema, type CreateStaffFormValues } from '../../validations/staffScherma';
import ErrorBox from '../Auth/ErrorBox';
import ImageInput from '../Common/ImageInput';

interface StaffFormProps {
  staff?: STAFF | null;
  mode: 'create' | 'edit';
}

export default function StaffForm({ staff, mode }: StaffFormProps) {
  const { createStaffFetch, updateStaffFetch, closeModal } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageValue, setImageValue] = useState<string | File | undefined>(staff?.image || undefined);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateStaffFormValues>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      username: staff?.username || '',
      email: staff?.email || '',
      role: staff?.role || 'waiter',
      password: staff?.password || '',
      image: staff?.image || '',
    },
  });

  const onSubmit = async (data: CreateStaffFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      let payload : CreateStaffFormValues | FormData;
      if (imageValue instanceof File) {
        // Use FormData for file upload
      payload = new FormData();
        payload.append("username", data.username);
        payload.append("email", data.email);
        payload.append("role", data.role);
        if (data.password) payload.append("password", data.password);
        payload.append("image", imageValue);
      } else {
        // Use JSON for URL or no image
        payload = {
          ...data,
          image: imageValue || "",
        };
      }

      if(staff && staff._id){
        response = await updateStaffFetch(staff._id, payload);
      }else{
        response = await createStaffFetch(payload);
      }


      if (response.success) {
        reset();
        setImageValue(undefined);
        closeModal();
      } else {
        setError(response.message || "Operation failed. Please try again.");
      }
    } catch {
      setError('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      {error && <ErrorBox message={error} />}

      {/* Username Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-amber-400" />
          </div>
          <input
            {...register('username')}
            type="text"
            placeholder="Enter username"
            autoComplete="username"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
              ${errors.username
                ? 'border-red-500 bg-red-50'
                : 'border-amber-300 hover:border-amber-400 focus:bg-white'
              }
            `}
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.username.message}
          </p>
        )}
      </div>

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
            placeholder="Enter email address"
            autoComplete="email"
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

      {/* Password Field (only for create mode) */}
      {mode === 'create' && (
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
              placeholder="Enter password"
              autoComplete="new-password"
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
      )}

      {/* Role Field */}
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-2">
          Role
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserCheck className="h-5 w-5 text-amber-400" />
          </div>
          <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-amber-400" />
          </div>
          <select
            {...register('role')}
            className={`
              w-full px-10 py-3 border appearance-none rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200
              ${errors.role
                ? 'border-red-500 bg-red-50'
                : 'border-amber-300 hover:border-amber-400 focus:bg-white'
              }
            `}
          >
            <option value="waiter">Waiter </option>
            <option value="kitchen">Kitchen</option>
          </select>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Image Field */}
      <ImageInput
        value={imageValue}
        onChange={setImageValue}
      />

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-3 border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            flex-1 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {mode === 'edit' ? 'Updating...' : 'Creating...'}
            </div>
          ) : (
            mode === 'edit' ? 'Update Staff' : 'Create Staff'
          )}
        </button>
      </div>
    </form>
  );
}
