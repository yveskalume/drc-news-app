import React from "react";
import {Card, Image, Paragraph, XStack, YStack} from "tamagui";
import {useRelativeTime} from "@/hooks/useRelativeTime";
import Caption from "@/ui/components/typography/Caption";
import ArticleSourcePill from "@/ui/components/content/article/ArticleSourcePill";
import type {ArticleOverview} from "@/api/types";

type ArticleMagazineCardProps = {
    data: ArticleOverview;
};

export function ArticleMagazineCard(props: ArticleMagazineCardProps) {
    const {data} = props;
    const relativeTime = useRelativeTime(data.publishedAt);

    return (
        <Card
            width="100%"
            backgroundColor="transparent"
            borderRadius="$4"
            padding={0}
        >
            <XStack flexDirection="row" gap="$3" alignItems="center">
                <YStack flex={1} gap="$2">
                    <Paragraph numberOfLines={2} fontWeight="600" fontSize="$5">
                        {data.title}
                    </Paragraph>
                    <Paragraph size="$3" numberOfLines={2} color="$colorHover">
                        {data.excerpt}
                    </Paragraph>
                </YStack>

                {data.image && (
                    <Image
                        borderRadius="$4"
                        source={{uri: data.image, cache: 'force-cache'}}
                        objectFit="cover"
                        width={120}
                        height={90}
                        backgroundColor="$gray3"
                    />
                )}
            </XStack>

            <YStack marginTop="$3">
                <XStack justifyContent="space-between" alignItems="center">
                    <ArticleSourcePill source={data.source}/>
                    <Caption>{relativeTime}</Caption>
                </XStack>
            </YStack>
        </Card>
    );
}
