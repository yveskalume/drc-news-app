import {
    ClientDetailErrorResponse,
    ClientErrorResponse, ListArticlesRequest, ListArticlesResponse,
    LoginRequest,
    LoginResponse,
    PasswordForgottenRequest
} from "@/api/types";
import api from "@/api/api";
import {useMutation, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import qs from "qs";

type ErrorResponse = AxiosError<ClientErrorResponse|ClientDetailErrorResponse>

export const useLogin = () => {
    return useMutation<LoginResponse, ErrorResponse, LoginRequest>({
        mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
            const response = await api.post('/login_check', data);
            return response.data;
        }
    })
};

export const useRegister = () => {

}

export const useArticles = (data: ListArticlesRequest) => {
    return useQuery<ListArticlesResponse, ErrorResponse>({
        queryKey: ['list-articles', data],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (data): Promise<ListArticlesResponse> => {
            const query = qs.stringify(data, { skipNulls: true })
            const response = await api.get(`/aggregator/articles?${query}`);
            return response.data
        }
    })
}

export const usePasswordForgotten = () => {
    return useMutation<void, ErrorResponse, PasswordForgottenRequest>({
        mutationFn: async (data: PasswordForgottenRequest): Promise<void> => {
            await api.post('/password/request', data);
        }
    })
}

export const useLogout = () => {
    return useMutation<void, ErrorResponse, void>({
        mutationFn: async (): Promise<void> => {
            await api.post('/token/invalidate');
        }
    })
}
