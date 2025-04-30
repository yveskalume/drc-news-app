import {ClientDetailErrorResponse, ClientErrorResponse, LoginRequest, LoginResponse} from "@/api/types";
import api from "@/api/api";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

type ErrorResponse = AxiosError<ClientErrorResponse|ClientDetailErrorResponse>

export const useLogin = () => {
    return useMutation<LoginResponse, ErrorResponse, LoginRequest>({
        mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
            const response = await api.post('/login_check', data);
            return response.data;
        }
    })
};

export const useLogout = () => {
    return useMutation<void, ErrorResponse, void>({
        mutationFn: async (): Promise<void> => {
            await api.post('/token/invalidate');
        }
    })
}
