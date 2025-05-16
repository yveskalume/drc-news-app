import axios, { AxiosError, AxiosInstance } from "axios";

import { RefreshTokenData, RefreshTokenResponse } from "@/api/identity-and-access/login";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/store/auth";

export type ClientDetailErrorResponse = {
    type: string;
    title: string;
    detail: string;
    status: number;
};

export type ClientErrorResponse = {
    code: string;
    message: string;
};

export type ErrorResponse = AxiosError<ClientErrorResponse | ClientDetailErrorResponse>;

const endpoint = process.env.EXPO_PUBLIC_API_URL!;
const client: AxiosInstance = axios.create({
    baseURL: endpoint,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const safeMessage = (error: AxiosError<ClientErrorResponse | ClientDetailErrorResponse> | Error): string => {
    if (error instanceof AxiosError && error.response) {
        const response = error.response.data;
        console.log(JSON.stringify(response));

        if ("message" in response) {
            return response.message;
        } else if ("detail" in response) {
            return response.detail;
        }
    }

    console.log(JSON.stringify(error));
    return "Une erreur est survenue";
};

let isAuthTokenRefreshing = false;
let failedRequestsQueue: ((token: string) => void)[] = [];

const processFailedRequestsQueue = (token: string) => {
    failedRequestsQueue.forEach(callback => callback(token));
    failedRequestsQueue = [];
};

// Add the Authorization header to all requests
client.interceptors.request.use(async config => {
    const token = await getAccessToken();
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// Handle 401 errors and refresh the token
client.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isAuthTokenRefreshing) {
                return new Promise(resolve => {
                    failedRequestsQueue.push((token: string) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(client(originalRequest));
                    });
                });
            }

            isAuthTokenRefreshing = true;

            try {
                const refreshToken = await getRefreshToken();
                if (!refreshToken) {
                    await clearTokens();
                    return Promise.reject(error);
                }

                const response = await axios.post<RefreshTokenResponse>(`${endpoint}/token/refresh`, {
                    refresh_token: refreshToken,
                } as RefreshTokenData);

                const updatedToken = response.data.token;
                await setTokens(updatedToken, refreshToken);
                processFailedRequestsQueue(updatedToken);

                originalRequest.headers["Authorization"] = `Bearer ${updatedToken}`;
                return client(originalRequest);
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

export default client;
