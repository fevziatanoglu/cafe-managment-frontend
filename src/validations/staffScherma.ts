    import { z } from 'zod';

    export const createStaffSchema = z.object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
      email: z
        .string()
        .email('Please enter a valid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters'),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
      role: z.enum(['waiter', 'kitchen'], {
        error: 'Role must be either waiter or kitchen'
      }),
      image: z.union([z.instanceof(File), z.string()]).optional()
    });
    
    export const updateStaffSchema = z.object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .optional(),
      email: z
        .string()
        .email('Please enter a valid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(100, 'Email must be less than 100 characters')
        .optional(),
      role: z.enum(['waiter', 'kitchen'], {
        error: 'Role must be either waiter or kitchen'
      }).optional(),
      password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .optional(),
        image: z.union([z.instanceof(File), z.string()]).optional()
    });
    

    
    export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;
    export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;

