import { useMutation } from "@tanstack/react-query";

import client, { ErrorResponse } from "@/api/client";

export type PasswordForgottenData = {
    email: string;
};

export type PasswordResetData = {
    password: string;
    confirm: string;
};

export type PasswordUpdateData = {
    current: string;
    password: string;
    confirm: string;
};

export const usePasswordForgotten = () => {
    return useMutation<void, ErrorResponse, PasswordForgottenData>({
        mutationFn: async (data: PasswordForgottenData): Promise<void> => {
            await client.post("/password/request", data);
        },
    });
};

export const usePasswordReset = (token: string) => {
    return useMutation<void, ErrorResponse, PasswordResetData>({
        mutationFn: async (data: PasswordResetData): Promise<void> => {
            await client.post(`/password/reset/${token}`, data);
        },
    });
};

export const usePasswordUpdate = () => {
    return useMutation<void, ErrorResponse, PasswordUpdateData>({
        mutationFn: async (data: PasswordUpdateData): Promise<void> => {
            await client.post("/password/update", data);
        },
    });
};
