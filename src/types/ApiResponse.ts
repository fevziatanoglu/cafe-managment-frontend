
export interface API_RESPONSE<T = null> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}



