
import { AxiosError } from "axios";
import type { API_RESPONSE } from "../types";

const handleApiError = <T>(e: unknown): API_RESPONSE<T> => {
    if (e instanceof AxiosError && e.response) {
        return {
            success: false,
            error: e.response.data.error,
            message: e.response.data.message || "Request failed",
        };
    }
    return {
        success: false,
        message: "An unexpected error occurred.",
    };
};

export default handleApiError
