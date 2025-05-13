import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import {Paragraph, YStack} from 'tamagui'

import ScreenView from '@/ui/components/ScreenView'
import {useInfiniteArticleOverviewList} from '@/api/request'
import {ArticleOverview} from '@/api/types'
import {ArticleOverviewCard, ArticleOverviewSkeleton} from '@/ui/components/content/ArticleOverviewCard'
import Heading from "@/ui/components/typography/Heading";

const FooterListLoader = () => (
    <>
        <YStack height="$1"/>
        <ActivityIndicator/>
    </>
)

const ItemSeparator = () => <YStack flex={1} width="100%" height="$1"/>

const skeletons = new Array(3).fill(0);
const SkeletonList = () => {
    return skeletons.map((_, index) => <ArticleOverviewSkeleton key={index}/>)
}

export default function Index() {
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

    const keyExtractor = useCallback((item: ArticleOverview) => item.id, []);

    const renderItem = useCallback(({ item }: { item: ArticleOverview }) => (
        <Pressable onPress={() => router.push(`/(authed)/(tabs)/articles/${item.id}`)}>
            <ArticleOverviewCard data={item} displayMode="magazine" />
        </Pressable>
    ), [router]);

    return (
        <ScreenView paddingBottom={0}>
            <Heading>Actualités</Heading>

            {isLoading && <SkeletonList/>}
            {!isLoading && <FlatList
                data={articleOverviews}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={ItemSeparator}
                contentContainerStyle={{
                    paddingBottom: 0
                }}
                onEndReached={handleOnEndReached}
                onEndReachedThreshold={0.5}
                refreshing={isLoading}
                onRefresh={refetch}
                ListFooterComponent={isFetchingNextPage ? <FooterListLoader/> : null}
                ListEmptyComponent={() => (
                    <Paragraph>Pas d’articles disponibles pour le moment.</Paragraph>
                )}
                initialNumToRender={5}
                removeClippedSubviews
            />}
        </ScreenView>
    )
}
