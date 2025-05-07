import ScreenView from "@/components/ScreenView";
import {Card, H4, Paragraph, ScrollView, XStack, YStack} from "tamagui";
import {SourceOverview} from "@/api/types";
import {useSourcesStatisticsOverview} from "@/api/request";
import {ChevronRight} from "@tamagui/lucide-icons";
import Heading from "@/components/typography/Heading";
import AppLoadingView from "@/components/AppLoadingView";

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
        return <AppLoadingView/>
    }

    return (
        <ScreenView>
            <Heading>Statistiques</Heading>
            <ScrollView width="100%">
                <YStack gap="$3">
                    {sources.map(source => <SourceOverviewCard key={source.source} data={source}/>)}
                </YStack>
            </ScrollView>
        </ScreenView>
    );
}
