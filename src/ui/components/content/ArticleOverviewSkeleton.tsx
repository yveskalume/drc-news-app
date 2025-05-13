import React, {useCallback} from "react";
import {Dimensions, FlatList} from "react-native";
import {View} from "tamagui";
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import ArticleOverviewList from "@/ui/components/content/ArticleOverviewList";

const {width: screenWidth} = Dimensions.get('window');
const data: number[] = new Array(3).fill(0);

type ArticleOverviewSkeletonListProps = {
    horizontal?: boolean;
}

const ArticleOverviewSkeleton = (props: any) => (
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
        <Rect x="0" y="216" rx="4" ry="4" width="80%" height="10"/>
        <Rect x="0" y="232" rx="4" ry="4" width="100%" height="10"/>

        <Rect x="0" y="256" rx="4" ry="4" width="100%" height="10"/>
        <Rect x="0" y="272" rx="4" ry="4" width="60%" height="10"/>

        <Circle cx="10" cy="310" r="9"/>
        <Rect x="30" y="305" rx="4" ry="4" width="15%" height="10"/>
        <Rect x="215" y="305" rx="4" ry="4" width="20%" height="10"/>
    </ContentLoader>
)

const keyExtractor = (_: number, index: number) => index.toString();

export default function ArticleOverviewSkeletonList(props: ArticleOverviewSkeletonListProps) {
    const {horizontal = false} = props;

    const ItemSeparator = horizontal ? ArticleOverviewList.HorizontalSeparator : ArticleOverviewList.VerticalSeparator;

    const renderItem = useCallback(({item}: { item: any }) => {
        const itemWidth = horizontal ? screenWidth * 0.7 : screenWidth;

        return (
            <View style={{width: itemWidth}}>
                <ArticleOverviewSkeleton/>
            </View>
        )
    }, [horizontal]);


    return (
        <FlatList
            data={data}
            scrollEnabled={false}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparator}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 0}}
            removeClippedSubviews={true}
        />
    )
}
