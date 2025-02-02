export class ApiError extends Error {
    constructor(
      message: string,
      public statusCode?: number,
      public response?: any
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  export const handleApiError = (error: any): ApiError => {
    if (error.response) {
      return new ApiError(
        error.response.data.message || 'An error occurred',
        error.response.status,
        error.response.data
      );
    }
    if (error.request) {
      return new ApiError('No response received from server');
    }
    return new ApiError(error.message || 'Unknown error occurred');
  };