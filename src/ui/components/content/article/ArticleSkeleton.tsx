import React, {useCallback} from "react";
import {Dimensions, FlatList} from "react-native";
import {View} from "tamagui";
import ContentLoader, {Circle, Rect} from "react-content-loader/native";
import ArticleList, {ArticleListDisplayMode} from "@/ui/components/content/article/ArticleList";

const {width: screenWidth} = Dimensions.get('window');
const data: number[] = new Array(5).fill(0);

type ArticleSkeletonListProps = {
    horizontal?: boolean;
    displayMode?: ArticleListDisplayMode;
}

const OverviewCardSkeleton = (props: any) => (
    <ContentLoader
        speed={1}
        interval={0.3}
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

const MagazineCardSkeleton = (props: any) => (
    <ContentLoader
        speed={1.5}
        backgroundColor="#D4D5D8"
        foregroundColor="white"
        height={180}
        animate={true}
        width="100%"
        {...props}
    >
        <Rect x="200" y="0" rx="8" ry="8" width="40%" height="120"/>

        <Rect x="0" y="16" rx="4" ry="4" width="40%" height="10"/>
        <Rect x="0" y="32" rx="4" ry="4" width="49%" height="10"/>
        <Rect x="0" y="56" rx="4" ry="4" width="45%" height="10"/>
        <Rect x="0" y="72" rx="4" ry="4" width="30%" height="10"/>
        <Rect x="0" y="88" rx="4" ry="4" width="49%" height="10"/>

        <Circle cx="10" cy="140" r="9"/>
        <Rect x="30" y="135" rx="4" ry="4" width="15%" height="10"/>
        <Rect x="215" y="135" rx="4" ry="4" width="140" height="10"/>
    </ContentLoader>
)

const TextOnlyCardSkeleton = (props: any) => (
    <ContentLoader
        speed={1.5}
        backgroundColor="#D4D5D8"
        foregroundColor="white"
        height={150}
        animate={true}
        width="100%"
        {...props}
    >
        <Rect x="0" y="16" rx="4" ry="4" width="80%" height="10"/>
        <Rect x="0" y="32" rx="4" ry="4" width="100%" height="10"/>

        <Rect x="0" y="56" rx="4" ry="4" width="100%" height="10"/>
        <Rect x="0" y="72" rx="4" ry="4" width="60%" height="10"/>

        <Circle cx="10" cy="110" r="9"/>
        <Rect x="30" y="105" rx="4" ry="4" width="15%" height="10"/>
        <Rect x="215" y="105" rx="4" ry="4" width="20%" height="10"/>
    </ContentLoader>
)


const keyExtractor = (_: number, index: number) => index.toString();

const selectSkeletonComponent = (displayMode: ArticleListDisplayMode) => {
    switch (displayMode) {
        case 'magazine':
            return MagazineCardSkeleton;
        case 'text-only':
            return TextOnlyCardSkeleton;
        default:
            return OverviewCardSkeleton;
    }
}

export default function ArticleSkeletonList(props: ArticleSkeletonListProps) {
    const {horizontal = false, displayMode = 'magazine'} = props;

    const ItemSeparator = horizontal ? ArticleList.HorizontalSeparator : ArticleList.VerticalSeparator;

    const renderItem = useCallback(({item}: { item: any }) => {
        const itemWidth = horizontal ? screenWidth * 0.7 : screenWidth;
        const SkeletonComponent = selectSkeletonComponent(displayMode);

        return (
            <View style={{width: itemWidth}}>
                <SkeletonComponent/>
            </View>
        )
    }, [horizontal, displayMode]);

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
