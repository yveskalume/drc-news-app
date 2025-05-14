import React from "react";
import {Card, Image, Paragraph, XStack, YStack} from "tamagui";
import {useRelativeTime} from "@/hooks/useRelativeTime";
import Caption from "@/ui/components/typography/Caption";
import ArticleSourcePill from "@/ui/components/content/article/ArticleSourcePill";
import {ArticleOverview} from "@/api/types";

type ArticleOverviewCardProps = {
    data: ArticleOverview
}

export function ArticleOverviewCard(props: ArticleOverviewCardProps) {
    const {data} = props
    const relativeTime = useRelativeTime(data.publishedAt);

    return (
        <Card backgroundColor="transparent">
            {data.image && (
                <Image
                    borderRadius="$4"
                    source={{uri: data.image, cache: 'force-cache'}}
                    objectFit="cover"
                    width="100%"
                    height="200"
                    backgroundColor="$gray3"
                />
            )}
            <YStack marginTop="$2" gap="$2">
                <Paragraph numberOfLines={2} fontWeight="600" fontSize="$5">
                    {data.title}
                </Paragraph>
                <Paragraph size="$3" numberOfLines={2}>
                    {data.excerpt}
                </Paragraph>
            </YStack>
            <YStack marginTop="$2">
                <XStack justifyContent="space-between" alignItems="center">
                    <ArticleSourcePill source={data.source}/>
                    <Caption>{relativeTime}</Caption>
                </XStack>
            </YStack>
        </Card>
    );
}
