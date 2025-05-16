import { useMutation } from "@tanstack/react-query";

import client, { ErrorResponse } from "@/api/client";

export type LoginData = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    refresh_token: string;
};

export type RefreshTokenData = {
    refresh_token: string;
};

export type RefreshTokenResponse = {
    token: string;
};

export const useLogin = () => {
    return useMutation<LoginResponse, ErrorResponse, LoginData>({
        mutationFn: async (data: LoginData): Promise<LoginResponse> => {
            const response = await client.post("/login_check", data);
            return response.data;
        },
    });
};

export const useLogout = () => {
    return useMutation<void, ErrorResponse, void>({
        mutationFn: async (): Promise<void> => {
            await client.post("/token/invalidate");
        },
    });
};
