import React from 'react'
import {ScrollView, YStack} from 'tamagui'

import ScreenView from '@/ui/components/layout/ScreenView'
import {useArticleOverviewList, useSourcesStatisticsOverview} from '@/api/request'
import {ArticleOverview, SourceOverview} from '@/api/types'
import Heading from "@/ui/components/typography/Heading";
import ArticleSkeletonList from "@/ui/components/content/article/ArticleSkeleton";
import ArticleList from "@/ui/components/content/article/ArticleList";
import SourceList from "@/ui/components/content/source/SourceList";
import SourceSkeletonList from "@/ui/components/content/source/SourceSkeleton";

export default function Index() {
    const {data: articles, isLoading: articlesLoading} = useArticleOverviewList({limit: 20})
    const {data: sources, isLoading: sourcesLoading} = useSourcesStatisticsOverview()
    const articleOverviews: ArticleOverview[] = articles?.items ?? []
    const sourcesOverviews: SourceOverview[] = sources?.items ?? []

    return (
        <ScreenView paddingBottom={0}>
            <Heading>Actualités</Heading>
            <ScrollView contentContainerStyle={{paddingBottom: 0}}>
                <YStack gap="$4">
                    <YStack gap="$2">
                        <ScreenView.Section
                            title="Tendances"
                            forwardLink="/(authed)/(tabs)/articles/all-articles"
                        />

                        {articlesLoading && <ArticleSkeletonList
                            displayMode='card'
                            horizontal={true}
                        />}
                        {!articlesLoading && <ArticleList
                            data={articleOverviews}
                            refreshing={articlesLoading}
                            displayMode='card'
                            horizontal={true}
                        />}
                    </YStack>
                    <YStack gap="$2">
                        <ScreenView.Section
                            title="Nos sources"
                            forwardLink="/(authed)/(tabs)/sources/statistics"
                        />

                        {sourcesLoading && <SourceSkeletonList horizontal={true}/>}
                        {!sourcesLoading && <SourceList
                            data={sourcesOverviews}
                            refreshing={sourcesLoading}
                            horizontal={true}
                        />}
                    </YStack>
                    <YStack gap="$2">
                        <ScreenView.Section
                            title="Dernières actualités"
                            forwardLink="/(authed)/(tabs)/articles/all-articles"
                        />
                    </YStack>
                </YStack>
            </ScrollView>
        </ScreenView>
    )
}
