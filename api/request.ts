import {
    ClientDetailErrorResponse,
    ClientErrorResponse, GetArticleListQuery, ArticleOverviewList,
    Login,
    LoginResponse,
    PasswordForgotten, Register, SourceStatisticsDetails, SourcesStatisticsOverview, Article
} from "@/api/types";
import api from "@/api/api";
import {useInfiniteQuery, useMutation, useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import qs from "qs";

type ErrorResponse = AxiosError<ClientErrorResponse|ClientDetailErrorResponse>

export const useLogin = () => {
    return useMutation<LoginResponse, ErrorResponse, Login>({
        mutationFn: async (data: Login): Promise<LoginResponse> => {
            const response = await api.post('/login_check', data);
            return response.data;
        }
    })
};

export const useRegister = () => {
    return useMutation<void, ErrorResponse, Register>({
        mutationFn: async (data: Register): Promise<void> => {
            await api.post('/register', data)
        }
    })
}

export const useArticleOverviewList = (data: GetArticleListQuery) => {
    const query = qs.stringify(data, { skipNulls: true })
    const url = `/aggregator/articles?${query}`

    return useQuery<ArticleOverviewList, ErrorResponse>({
        queryKey: [url],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (data): Promise<ArticleOverviewList> => {
            const response = await api.get(url);
            return response.data
        }
    })
}

export const useArticleDetails = (id: string) => {
    return useQuery<Article, ErrorResponse>({
        queryKey: ['article', id],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (): Promise<Article> => {
            const response = await api.get(`/aggregator/articles/${id}`)
            return response.data
        }
    })
}

export const useSourceStatisticsDetails = (source: string) => {
    return useQuery<SourceStatisticsDetails, ErrorResponse>({
        queryKey: ['source-statistics-details', source],
        queryFn: async (source): Promise<SourceStatisticsDetails> => {
            const response = await api.get(`/aggregator/statistics/${source}`);
            return response.data;
        }
    })
}

export const useSourcesStatisticsOverview = () => {
    return useQuery<SourcesStatisticsOverview, ErrorResponse>({
        queryKey: ['sources-statistics-overview'],
        queryFn: async (): Promise<SourcesStatisticsOverview> => {
            const response = await api.get(`/aggregator/statistics`);
            return response.data;
        }
    })
}

export const useInfiniteArticleOverviewList = (baseParams: Omit<GetArticleListQuery, 'page'>) => {
    return useInfiniteQuery<ArticleOverviewList>({
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
        staleTime: 1_000 * 60 * 5
    })
}

export const usePasswordForgotten = () => {
    return useMutation<void, ErrorResponse, PasswordForgotten>({
        mutationFn: async (data: PasswordForgotten): Promise<void> => {
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
