import axios, { AxiosInstance, AxiosError } from "axios";

// Create a new Axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL, // Set your API base URL
  timeout: 5000, // Set a reasonable timeout value
});

api.interceptors.request.use(function (config) {
  // Lấy token từ local storage hoặc từ nơi khác
  const token = localStorage.getItem("token");

  // Kiểm tra token và thêm vào header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type ErrorResponse = {
  message: string;
  ok: boolean;
};
// Thêm interceptor cho phản hồi sau khi nhận được
api.interceptors.response.use(
  function (response) {
    // Xử lý phản hồi thành công
    return response.data;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      // Process AxiosError
      if (axiosError.response) {
        // The error has a response with status code and data
        const message = axiosError.response.data.message;
        return Promise.reject(message);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
