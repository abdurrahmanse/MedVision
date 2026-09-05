const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMessage = `HTTP error! status: ${res.status}`;
    try {
      const errorData = (await res.json()) as any;
      if (errorData.detail) {
        // FastAPI validation errors are arrays
        errorMessage = Array.isArray(errorData.detail) 
          ? errorData.detail[0].msg 
          : errorData.detail;
      } else if (errorData.error && errorData.error.message) {
        errorMessage = errorData.error.message;
      }
    } catch (e) {
      // If it's not JSON (e.g. Network Error), fallback to standard status
      if (res.status === 413) errorMessage = "File too large. Maximum size is 5MB.";
    }
    throw new Error(errorMessage);
  }
  return (await res.json()) as T;
}

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`);
      return handleResponse<T>(res);
    } catch (e: any) {
      throw new Error(e.message || "Network Error: Unable to connect to the backend.");
    }
  },
  postFormData: async <T>(endpoint: string, formData: FormData): Promise<T> => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse<T>(res);
    } catch (e: any) {
      throw new Error(e.message || "Network Error: Unable to upload file.");
    }
  }
};
