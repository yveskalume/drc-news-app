import ScreenView from "@/components/ScreenView";
import {Card, H3, H4, Paragraph, ScrollView, View, XStack, YStack} from "tamagui";
import {SourceOverview} from "@/api/types";
import {useSourcesStatisticsOverview} from "@/api/request";
import {ActivityIndicator} from "react-native";
import {ChevronRight} from "@tamagui/lucide-icons";

const SourceOverviewCard = ({data}: { data: SourceOverview }) => {
    return (
        <Card theme="accent" elevate padding="$3" size="$4">
            <XStack alignSelf="flex-end">
                <Paragraph color="$gray10">{new Date(data.crawledAt).toDateString()}</Paragraph>
                <ChevronRight size="$1" color="$gray10"/>
            </XStack>
            <XStack gap="$2" justifyContent="space-between" alignItems="center">
                <YStack>
                    <Paragraph color="$accent8" fontWeight="bold">{data.source}</Paragraph>
                    <H4 fontWeight="bold" fontSize="$6">{data.articles.toLocaleString()}</H4>
                </YStack>
            </XStack>
        </Card>
    );
};

export default function Statistics() {
    const {data, isLoading} = useSourcesStatisticsOverview();
    const sources = data?.items ?? [];

    if (isLoading) {
        return (
            <View flex={1} padding="$4" backgroundColor="$background" alignItems="center" justifyContent="center"
                  gap="$4">
                <ActivityIndicator/>
                <Paragraph>Chargement...</Paragraph>
            </View>
        )
    }

    return (
        <ScreenView>
            <View flex={1} padding="$4" gap="$4">
                <H3 fontWeight="bold" alignSelf="flex-start">Statistiques</H3>
                <ScrollView>
                    <YStack flex={1} gap="$3">
                        {sources.map(source => <SourceOverviewCard key={source.source} data={source}/>)}
                    </YStack>
                </ScrollView>
            </View>
        </ScreenView>
    );
}
