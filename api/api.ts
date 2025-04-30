import axios, {AxiosInstance} from 'axios';
import {clearTokens, setTokens, useAccessToken, useRefreshToken} from "@/api/auth";
import {RefreshTokenRequest, RefreshTokenResponse} from "@/api/types";

const endpoint = 'https://news.devscast.org/api';

const api: AxiosInstance = axios.create({
    baseURL: endpoint,
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

let isAuthTokenRefreshing = false;
let failedRequestsQueue: ((token: string) => void)[] = [];

const processFailedRequestsQueue = (token: string) => {
    failedRequestsQueue.forEach(callback => callback(token));
    failedRequestsQueue = [];
}

// Add the Authorization header to all requests
api.interceptors.request.use(async config => {
    const token = await useAccessToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

// Handle 401 errors and refresh the token
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isAuthTokenRefreshing) {
                return new Promise((resolve) => {
                    failedRequestsQueue.push((token: string) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                })
            }

            isAuthTokenRefreshing = true;

            try {
                const refreshToken = await useRefreshToken();
                if (!refreshToken) {
                    await clearTokens();
                    return Promise.reject(error)
                }

                const response = await axios.post<RefreshTokenResponse>(`${endpoint}/token/refresh`, {
                    "refresh_token": refreshToken
                } as RefreshTokenRequest);

                const updatedToken = response.data.token;
                await setTokens(updatedToken, refreshToken);
                processFailedRequestsQueue(updatedToken)

                originalRequest.headers['Authorization'] = `Bearer ${updatedToken}`;
                return api(originalRequest);
            } catch (error) {
                await clearTokens();
                return Promise.reject(error);
            } finally {
                isAuthTokenRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
