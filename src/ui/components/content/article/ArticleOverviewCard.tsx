import React from "react";

import { Card, Paragraph, XStack, YStack } from "tamagui";

import { ArticleOverview } from "@/api/aggregator/article";
import { useRelativeTime } from "@/hooks/useRelativeTime";
import ArticleCoverImage from "@/ui/components/content/article/ArticleCoverImage";
import ArticleSourcePill from "@/ui/components/content/article/ArticleSourcePill";
import Caption from "@/ui/components/typography/Caption";

type ArticleOverviewCardProps = {
    data: ArticleOverview;
};

export function ArticleOverviewCard(props: ArticleOverviewCardProps) {
    const { data } = props;
    const relativeTime = useRelativeTime(data.publishedAt);

    return (
        <Card backgroundColor="transparent">
            {data.image && <ArticleCoverImage uri={data.image} width="100%" height={200} />}
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
                    <ArticleSourcePill source={data.source} />
                    <Caption>{relativeTime}</Caption>
                </XStack>
            </YStack>
        </Card>
    );
}
