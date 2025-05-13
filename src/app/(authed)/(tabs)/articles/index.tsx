import React from 'react'
import {ScrollView, YStack} from 'tamagui'

import ScreenView from '@/ui/components/layout/ScreenView'
import {useArticleOverviewList} from '@/api/request'
import {ArticleOverview} from '@/api/types'
import Heading from "@/ui/components/typography/Heading";
import ArticleOverviewSkeletonList from "@/ui/components/content/ArticleOverviewSkeleton";
import ArticleOverviewList from "@/ui/components/content/ArticleOverviewList";

export default function Index() {
    const {data, isLoading} = useArticleOverviewList({limit: 20})
    const articleOverviews: ArticleOverview[] = data?.items ?? []

    return (
        <ScreenView paddingBottom={0}>
            <Heading>Actualités</Heading>
            <ScrollView>
                <YStack gap="$4">
                    <YStack gap="$2">
                        <ScreenView.Section
                            title="Dernières nouvelles"
                            forwardLink="/(authed)/(tabs)/articles/all-articles"
                        />

                        {isLoading && <ArticleOverviewSkeletonList horizontal={true}/>}
                        {!isLoading && <ArticleOverviewList
                            data={articleOverviews}
                            refreshing={isLoading}
                            horizontal={true}
                        />}
                    </YStack>
                    <YStack>
                        <ScreenView.Section
                            title="Nos sources"
                            forwardLink="/(authed)/(tabs)/sources/statistics"
                        />
                    </YStack>
                </YStack>
            </ScrollView>
        </ScreenView>
    )
}
