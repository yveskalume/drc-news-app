import React from "react";
import {ArticleOverview} from "@/api/types";
import {Card, Image, Paragraph, XStack, YStack} from "tamagui";
import ContentLoader, {Rect} from "react-content-loader/native";
import {useRelativeTime} from "@/hooks/useRelativeTime";
import IconButton from "@/ui/components/controls/IconButton";
import {MoreVertical, Share} from "@tamagui/lucide-icons";
import Caption from "@/ui/components/typography/Caption";
import ArticleSourcePill from "@/ui/components/content/ArticleSourcePill";

type ArticleDisplayMode = 'card' | 'magazine' | 'text-only';

type ArticleOverviewCardProps = {
    data: ArticleOverview;
    displayMode?: ArticleDisplayMode;
};

export const ArticleOverviewSkeleton = (props: any) => {
    return (
        <ContentLoader
            speed={1.5}
            backgroundColor="#D4D5D8"
            foregroundColor="white"
            height={350}
            animate={true}
            width="100%"
            {...props}
        >
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height="200"/>
            <Rect x="0" y="216" rx="4" ry="4" width="250" height="20"/>
            <Rect x="0" y="246" rx="4" ry="4" width="150" height="14"/>

            <Rect x="0" y="268" rx="4" ry="4" width="80%" height="12"/>
            <Rect x="0" y="284" rx="4" ry="4" width="90%" height="12"/>

            <Rect x="0" y="320" rx="4" ry="4" width="20%" height="12"/>
            <Rect x="284" y="320" rx="4" ry="4" width="20%" height="12"/>
        </ContentLoader>
    );
}

export const ArticleOverviewCard = (props: ArticleOverviewCardProps) => {
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
                />
            )}
            <YStack marginTop="$2" gap="$2">
                <Paragraph fontWeight="600" fontSize="$5">
                    {data.title}
                </Paragraph>
                <Paragraph size="$3" numberOfLines={2}>
                    {data.excerpt}
                </Paragraph>
            </YStack>
            <YStack marginTop="$2">
                <ArticleSourcePill source={data.source}/>
                <XStack justifyContent="space-between" alignItems="center">
                    <Caption>{relativeTime}</Caption>
                    <XStack>
                        <IconButton onPress={() => {
                        }} icon={<Share/>}/>
                        <IconButton onPress={() => {
                        }} icon={<MoreVertical/>}/>
                    </XStack>
                </XStack>
            </YStack>
        </Card>
    );
}
