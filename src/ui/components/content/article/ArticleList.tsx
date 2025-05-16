import React, { useCallback } from "react";

import { Link } from "expo-router";
import { ActivityIndicator, Dimensions, FlatList, FlatListProps } from "react-native";
import { Paragraph, XStack, YStack } from "tamagui";

import { ArticleOverview } from "@/api/aggregator/article";
import { ArticleMagazineCard } from "@/ui/components/content/article/ArticleMagazineCard";
import { ArticleOverviewCard } from "@/ui/components/content/article/ArticleOverviewCard";
import { ArticleTextOnlyCard } from "@/ui/components/content/article/ArticleTextOnlyCard";

const { width: screenWidth } = Dimensions.get("window");

const HorizontalSeparator = () => <XStack width="$1" />;
const VerticalSeparator = () => <YStack height="$1" />;

const LoadingIndicator = () => (
    <>
        <YStack height="$1" />
        <ActivityIndicator />
        <YStack height="$1" />
    </>
);

export type ArticleListDisplayMode = "card" | "magazine" | "text-only";

type ArticleListProps = Omit<FlatListProps<ArticleOverview>, "renderItem"> & {
    data: ArticleOverview[];
    horizontal?: boolean;
    infiniteScroll?: boolean;
    displayMode?: ArticleListDisplayMode;
};

type ArticleListComponent = React.FC<ArticleListProps> & {
    HorizontalSeparator: typeof HorizontalSeparator;
    VerticalSeparator: typeof VerticalSeparator;
    LoadingIndicator: typeof LoadingIndicator;
};

const keyExtractor = (item: ArticleOverview) => item.id;

const selectDisplayComponent = (mode: ArticleListDisplayMode) => {
    switch (mode) {
        case "card":
            return ArticleOverviewCard;
        case "magazine":
            return ArticleMagazineCard;
        case "text-only":
            return ArticleTextOnlyCard;
        default:
            throw new Error(`Unknown display mode: ${mode}`);
    }
};

const ArticleList: ArticleListComponent = (props: ArticleListProps) => {
    const { data, displayMode = "magazine", horizontal = false, infiniteScroll = false, ...rest } = props;

    const renderItem = useCallback(
        ({ item }: { item: ArticleOverview }) => {
            const itemWidth = horizontal ? screenWidth * 0.7 : undefined;
            const DisplayComponent = selectDisplayComponent(displayMode);

            return (
                <Link href={`/(authed)/(tabs)/articles/${item.id}`} style={{ width: itemWidth }}>
                    <DisplayComponent data={item} />
                </Link>
            );
        },
        [horizontal, displayMode]
    );

    return (
        <FlatList
            {...rest}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={horizontal ? HorizontalSeparator : VerticalSeparator}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            ListFooterComponent={infiniteScroll ? LoadingIndicator : undefined}
            ListEmptyComponent={() => <Paragraph>Pas d’articles disponibles pour le moment.</Paragraph>}
        />
    );
};

ArticleList.HorizontalSeparator = HorizontalSeparator;
ArticleList.VerticalSeparator = VerticalSeparator;
ArticleList.LoadingIndicator = LoadingIndicator;

export default ArticleList;
