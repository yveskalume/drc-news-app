import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import qs from "qs";

import client, { ErrorResponse } from "@/api/client";

export type ArticleOverview = {
    id: string;
    title: string;
    link: string;
    categories: string[];
    excerpt: string;
    source: string;
    publishedAt: string;
    image?: string;
    readingTime: number;
};

export type Article = {
    id: string;
    title: string;
    link: string;
    categories: string[];
    body: string;
    source: string;
    hash: string;
    credibility: {
        bias: "neutral" | "slightly" | "partisan" | "extreme";
        reliability: "trusted" | "reliable" | "average" | "unreliable" | "low_trust";
        transparency: "low" | "medium" | "high";
    };
    sentiment: "negative" | "positive" | "neutral";
    metadata?: {
        title?: string;
        description?: string;
        image?: string;
        video?: string;
        audio?: string;
        locale?: string;
    };
    readingTime: number;
    publishedAt: string;
    crawledAt: string;
    updatedAt: string;
};

export type ArticleFiltersData = {
    dateRange?: {
        start: number;
        end: number;
    };
    page?: number;
    limit?: number;
    source?: string;
    search?: string;
};

export type ArticleOverviewList = {
    items: ArticleOverview[];
    pagination: {
        currentPage: number;
        totalItems: number;
        itemsPerPage: number;
        totalPages: number;
    };
};

export const useArticleOverviewList = (data: ArticleFiltersData) => {
    const query = qs.stringify(data, { skipNulls: true });
    const url = `/aggregator/articles?${query}`;

    return useQuery<ArticleOverviewList, ErrorResponse>({
        queryKey: [url],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (): Promise<ArticleOverviewList> => {
            const response = await client.get(url);
            return response.data;
        },
    });
};

export const useArticleDetails = (id: string) => {
    return useQuery<Article, ErrorResponse>({
        queryKey: ["article", id],
        staleTime: 1_000 * 60 * 5,
        queryFn: async (): Promise<Article> => {
            const response = await client.get(`/aggregator/articles/${id}`);
            return response.data;
        },
    });
};

export const useInfiniteArticleOverviewList = (baseParams: Omit<ArticleFiltersData, "page">) => {
    return useInfiniteQuery<ArticleOverviewList>({
        initialData: undefined,
        initialPageParam: 1,
        queryKey: ["articles", baseParams],
        queryFn: async ({ pageParam = 1 }) => {
            const query = qs.stringify({ ...baseParams, page: pageParam }, { skipNulls: true });
            const url = `/aggregator/articles?${query}`;
            const response = await client.get(url);
            return response.data;
        },
        getNextPageParam: lastPage => {
            const { currentPage, totalPages } = lastPage.pagination;
            return currentPage < totalPages ? currentPage + 1 : undefined;
        },
        staleTime: 1_000 * 60 * 5,
    });
};
