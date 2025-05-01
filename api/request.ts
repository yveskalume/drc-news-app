import {
    ClientDetailErrorResponse,
    ClientErrorResponse, ListArticlesRequest, ListArticlesResponse,
    LoginRequest,
    LoginResponse,
    PasswordForgottenRequest, RegisterRequest
} from "@/api/types";
import api from "@/api/api";
import {useInfiniteQuery, useMutation, useQuery} from "@tanstack/react-query";
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
    return useMutation<void, ErrorResponse, RegisterRequest>({
        mutationFn: async (data: RegisterRequest): Promise<void> => {
            await api.post('/register', data)
        }
    })
}

export const useArticles = (data: ListArticlesRequest) => {
    const query = qs.stringify(data, { skipNulls: true })
    const url = `/aggregator/articles?${query}`

    return useQuery<ListArticlesResponse, ErrorResponse>({
        queryKey: [url],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (data): Promise<ListArticlesResponse> => {
            const response = await api.get(url);
            return response.data
        }
    })
}

export const useInfiniteArticles = (baseParams: Omit<ListArticlesRequest, 'page'>) => {
    return useInfiniteQuery<ListArticlesResponse>({
        initialData: undefined,
        initialPageParam: 1,
        queryKey: ['articles', baseParams],
        queryFn: async ({ pageParam = 1 }) => {
            const query = qs.stringify({ ...baseParams, page: pageParam }, { skipNulls: true })
            const url = `/aggregator/articles?${query}`
            const response = await api.get(url)
            return response.data
        },
        getNextPageParam: (lastPage) => {
            const { currentPage, totalPages } = lastPage.pagination
            return currentPage < totalPages ? currentPage + 1 : undefined
        },
        staleTime: 1000 * 60 * 5
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
