import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface AxiosErrorResponse {
  message: string;
  statusCode: number;
}

export function isAxiosErrorWithResponse(
  error: unknown
): error is AxiosError<AxiosErrorResponse> {
  return axios.isAxiosError(error) && error.response !== undefined;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
