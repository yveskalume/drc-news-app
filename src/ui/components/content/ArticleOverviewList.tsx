import {Paragraph, XStack, YStack} from "tamagui";
import React, {useCallback} from "react";
import {ArticleOverview} from "@/api/types";
import {ActivityIndicator, Dimensions, FlatList, FlatListProps} from "react-native";
import {ArticleOverviewCard} from "@/ui/components/content/ArticleOverviewCard";
import {Link} from "expo-router";

const {width: screenWidth} = Dimensions.get('window');

const HorizontalSeparator = () => <XStack width="$1"/>
const VerticalSeparator = () => <YStack height="$1"/>

const LoadingIndicator = () => (
    <>
        <YStack height="$1"/>
        <ActivityIndicator/>
        <YStack height="$1"/>
    </>
)

type ArticleOverviewListProps = Omit<FlatListProps<ArticleOverview>, 'renderItem'> & {
    data: ArticleOverview[]
    horizontal?: boolean,
    infiniteScroll?: boolean,
}

type ArticleOverviewListComponent = React.FC<ArticleOverviewListProps> & {
    HorizontalSeparator: typeof HorizontalSeparator
    VerticalSeparator: typeof VerticalSeparator
    LoadingIndicator: typeof LoadingIndicator
}

const keyExtractor = (item: ArticleOverview) => item.id;

const ArticleOverviewList: ArticleOverviewListComponent = (props: ArticleOverviewListProps) => {
    const {
        data,
        horizontal = false,
        infiniteScroll = false,
        ...rest
    } = props;

    const renderItem = useCallback(({item}: { item: ArticleOverview }) => {
        const itemWidth = horizontal ? screenWidth * 0.7 : undefined;

        return (
            <Link href={`/(authed)/(tabs)/articles/${item.id}`} style={{width: itemWidth}}>
                <ArticleOverviewCard data={item}/>
            </Link>
        )
    }, [horizontal]);


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
            ListEmptyComponent={() => (
                <Paragraph>Pas d’articles disponibles pour le moment.</Paragraph>
            )}
        />
    );
}

ArticleOverviewList.HorizontalSeparator = HorizontalSeparator
ArticleOverviewList.VerticalSeparator = VerticalSeparator
ArticleOverviewList.LoadingIndicator = LoadingIndicator

export default ArticleOverviewList
