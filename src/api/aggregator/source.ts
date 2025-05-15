import { useQuery } from "@tanstack/react-query";

import client, { ErrorResponse } from "@/api/client";

export type SourceOverview = {
    articles: number;
    source: string;
    url: string;
    crawledAt: string;
    updatedAt?: string;
    followed: boolean;
};

export type SourceStatisticsDetails = {
    source: string;
    publicationsGraph: {
        date: string;
        count: number;
    }[];
    categoriesShares: {
        name: string;
        count: number;
        percentage: number;
    }[];
    categories: number;
    articles: number;
    crawledAt: string;
    updatedAt?: string;
};

export type SourcesStatisticsOverview = {
    items: SourceOverview[];
};

export const useSourceStatisticsDetails = (source: string) => {
    return useQuery<SourceStatisticsDetails, ErrorResponse>({
        queryKey: ["source-statistics-details", source],
        queryFn: async (source): Promise<SourceStatisticsDetails> => {
            const response = await client.get(`/aggregator/statistics/${source}`);
            return response.data;
        },
    });
};

export const useSourcesStatisticsOverview = () => {
    return useQuery<SourcesStatisticsOverview, ErrorResponse>({
        queryKey: ["sources-statistics-overview"],
        queryFn: async (): Promise<SourcesStatisticsOverview> => {
            const response = await client.get(`/aggregator/statistics`);
            return response.data;
        },
    });
};
