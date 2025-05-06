import React, {useCallback} from 'react'
import {ActivityIndicator, FlatList, Pressable} from 'react-native'
import {useRouter} from 'expo-router'
import {Paragraph, View, YStack} from 'tamagui'

import ScreenView from '@/components/ScreenView'
import {useInfiniteArticleOverviewList} from '@/api/request'
import {ArticleOverview} from '@/api/types'
import {ArticleOverviewCard, ArticleOverviewSkeleton} from '@/components/content/ArticleOverviewCard'
import Heading from "@/components/typography/Heading";

const FooterListLoader = () => (
    <>
        <YStack height="$1"/>
        <ActivityIndicator/>
    </>
)

const ItemSeparator = () => <YStack height="$1"/>

const SkeletonList = () => (
    <FlatList
        data={new Array(4).fill(0)}
        keyExtractor={(_, index) => `skeleton-${index}`}
        renderItem={({index}) => <ArticleOverviewSkeleton key={index}/>}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{padding: 16, alignItems: 'center'}}
    />
)

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

    const handleOnEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const keyExtractor = (item: ArticleOverview) => item.id

    const renderItem = ({item}: { item: ArticleOverview }) => (
        <Pressable onPress={() => router.push(`/(authed)/(tabs)/articles/${item.id}`)}>
            <ArticleOverviewCard data={item}/>
        </Pressable>
    )

    if (isLoading) {
        return (
            <ScreenView>
                <SkeletonList/>
            </ScreenView>
        )
    }

    return (
        <ScreenView paddingBottom={0}>
            <View flex={1} alignItems="center" gap="$4">
                <Heading>Actualités</Heading>

                <FlatList
                    data={articleOverviews}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={ItemSeparator}
                    contentContainerStyle={{paddingBottom: 0}}
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
                />
            </View>
        </ScreenView>
    )
}
