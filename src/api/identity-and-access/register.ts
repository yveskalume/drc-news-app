import { useMutation } from "@tanstack/react-query";

import client, { ErrorResponse } from "@/api/client";

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export const useRegister = () => {
    return useMutation<void, ErrorResponse, RegisterData>({
        mutationFn: async (data: RegisterData): Promise<void> => {
            await client.post("/register", data);
        },
    });
};
