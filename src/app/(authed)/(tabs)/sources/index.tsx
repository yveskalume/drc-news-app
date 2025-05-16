import { ChevronRight } from "@tamagui/lucide-icons";
import { Card, H4, Paragraph, ScrollView, XStack, YStack } from "tamagui";

import { SourceOverview, useSourcesStatisticsOverview } from "@/api/aggregator/source";
import ScreenView from "@/ui/components/layout/ScreenView";
import LoadingView from "@/ui/components/LoadingView";

const SourceOverviewCard = ({ data }: { data: SourceOverview }) => {
    return (
        <Card theme="accent" elevate padding="$3" size="$4">
            <XStack alignSelf="flex-end">
                <Paragraph color="$gray10">{new Date(data.crawledAt).toDateString()}</Paragraph>
                <ChevronRight size="$1" color="$gray10" />
            </XStack>
            <XStack gap="$2" justifyContent="space-between" alignItems="center">
                <YStack>
                    <Paragraph color="$accent8" fontWeight="bold">
                        {data.source}
                    </Paragraph>
                    <H4 fontWeight="bold" fontSize="$6">
                        {data.articles.toLocaleString()}
                    </H4>
                </YStack>
            </XStack>
        </Card>
    );
};

export default function Sources() {
    const { data, isLoading } = useSourcesStatisticsOverview();
    const sources: SourceOverview[] = data?.items ?? [];

    if (isLoading) {
        return <LoadingView />;
    }

    return (
        <ScreenView>
            <ScreenView.Heading title="Statistiques" />
            <ScrollView width="100%">
                <YStack gap="$3">
                    {sources.map(source => (
                        <SourceOverviewCard key={source.source} data={source} />
                    ))}
                </YStack>
            </ScrollView>
        </ScreenView>
    );
}
