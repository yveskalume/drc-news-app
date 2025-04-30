import {Card, H3, Paragraph, View, XStack, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {Article} from "@/api/types";
import {useArticles} from "@/api/request";
import {ActivityIndicator, FlatList} from "react-native";


const ArticleCard = ({article}: { article: Article }) => (
    <Card padding="$3" theme="gray">
        <Paragraph fontWeight="600" fontSize="$5" marginBottom="$1">
            {article.title}
        </Paragraph>
        <YStack gap="$3">
            <Paragraph size="$2" color="$gray10">{article.categories.toLowerCase()}</Paragraph>
            <Paragraph size="$3" numberOfLines={3}>
                {article.body}
            </Paragraph>
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$1">
                <Paragraph size="$2" color="$gray10">{article.source}</Paragraph>
                <Paragraph size="$2" color="$gray10">
                    {new Date(article.publishedAt).toLocaleDateString()}
                </Paragraph>
            </XStack>
        </YStack>
    </Card>
)

export default function Home() {
    const {data, isLoading, error} = useArticles({
        page: 1,
        limit: 20
    })

    if (isLoading) {
        return (
            <View flex={1} padding="$4" backgroundColor="$background" alignItems="center" justifyContent="center" gap="$4">
                <ActivityIndicator/>
                <Paragraph>Chargement...</Paragraph>
            </View>
        )
    }

    return (
        <ScreenView>
            <View flex={1} padding="$4" alignItems="center" gap="$4">
                <H3 fontWeight="bold" alignSelf="flex-start">Actualités</H3>
                <FlatList
                    data={data?.items ?? []}
                    contentContainerStyle={{paddingBottom: 0}}
                    keyExtractor={(item: Article) => item.id}
                    ItemSeparatorComponent={() => <YStack height="$1"/>}
                    renderItem={({item}) => <ArticleCard article={item}/>}
                />
            </View>
        </ScreenView>
    )
}
