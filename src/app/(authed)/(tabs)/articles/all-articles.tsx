import React, {useCallback} from 'react'
import {useRouter} from 'expo-router'

import ScreenView from '@/ui/components/layout/ScreenView'
import {useInfiniteArticleOverviewList} from '@/api/request'
import {ArticleOverview} from '@/api/types'
import BackButton from "@/ui/components/controls/BackButton";
import ArticleOverviewSkeletonList from "@/ui/components/content/ArticleOverviewSkeleton";
import ArticleOverviewList from "@/ui/components/content/ArticleOverviewList";

export default function AllArticles() {
    const router = useRouter()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteArticleOverviewList({limit: 20})

    const articleOverviews: ArticleOverview[] = data?.pages.flatMap(p => p.items) ?? []

    const handleOnEndReached = useCallback(async () => {
        if (hasNextPage && !isFetchingNextPage) {
            await fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <ScreenView paddingBottom={0}>
            <ScreenView.Heading
                leadingAction={<BackButton onPress={() => router.dismissTo('/(authed)/(tabs)/articles')}/>}
                title="Actualités"
            />
            {isLoading && <ArticleOverviewSkeletonList/>}
            {!isLoading && <ArticleOverviewList
                data={articleOverviews}
                onEndReached={handleOnEndReached}
                refreshing={isLoading}
                onRefresh={refetch}
                infiniteScroll={true}
            />}
        </ScreenView>
    )
}
