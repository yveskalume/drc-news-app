import React, { useCallback } from "react";

import { Link } from "expo-router";
import { FlatList, FlatListProps } from "react-native";
import { Paragraph, XStack, YStack } from "tamagui";

import { SourceOverview } from "@/api/aggregator/source";
import { SourceOverviewCard } from "@/ui/components/content/source/SourceOverviewCard";

const HorizontalSeparator = () => <XStack width="$1" />;
const VerticalSeparator = () => <YStack height="$0.5" />;

type SourceOverviewListProps = Omit<FlatListProps<SourceOverview>, "renderItem"> & {
    data: SourceOverview[];
    horizontal?: boolean;
    infiniteScroll?: boolean;
};

type SourceOverviewListComponent = React.FC<SourceOverviewListProps> & {
    HorizontalSeparator: typeof HorizontalSeparator;
    VerticalSeparator: typeof VerticalSeparator;
};

const keyExtractor = (item: SourceOverview) => item.source;

const SourceList: SourceOverviewListComponent = (props: SourceOverviewListProps) => {
    const { data, horizontal = false, ...rest } = props;

    const renderItem = useCallback(
        ({ item }: { item: SourceOverview }) => {
            return (
                <Link href={`/(authed)/(tabs)/sources/${item.source}`}>
                    <SourceOverviewCard data={item} horizontal={horizontal} />
                </Link>
            );
        },
        [horizontal]
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
            ListEmptyComponent={() => <Paragraph>Pas de sources disponibles pour le moment.</Paragraph>}
        />
    );
};

SourceList.HorizontalSeparator = HorizontalSeparator;
SourceList.VerticalSeparator = VerticalSeparator;

export default SourceList;
