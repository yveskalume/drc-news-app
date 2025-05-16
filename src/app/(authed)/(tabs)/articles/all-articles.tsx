import React, { useCallback } from "react";

import { useRouter } from "expo-router";

import { ArticleOverview, useInfiniteArticleOverviewList } from "@/api/aggregator/article";
import ArticleList from "@/ui/components/content/article/ArticleList";
import ArticleSkeletonList from "@/ui/components/content/article/ArticleSkeleton";
import BackButton from "@/ui/components/controls/BackButton";
import ScreenView from "@/ui/components/layout/ScreenView";

export default function AllArticles() {
    const router = useRouter();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteArticleOverviewList(
        { limit: 20 }
    );

    const articleOverviews: ArticleOverview[] = data?.pages.flatMap(p => p.items) ?? [];

    const handleOnEndReached = useCallback(async () => {
        if (hasNextPage && !isFetchingNextPage) {
            await fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <ScreenView paddingBottom={0}>
            <ScreenView.Heading
                leadingAction={<BackButton onPress={() => router.dismissTo("/(authed)/(tabs)/articles")} />}
                title="Actualités"
            />

            {isLoading && <ArticleSkeletonList displayMode="magazine" />}
            {!isLoading && (
                <ArticleList
                    data={articleOverviews}
                    onEndReached={handleOnEndReached}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    infiniteScroll={true}
                />
            )}
        </ScreenView>
    );
}
