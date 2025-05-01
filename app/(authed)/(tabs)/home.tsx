import {Card, H3, Paragraph, View, XStack, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {Article} from "@/api/types";
import {useInfiniteArticles} from "@/api/request";
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
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteArticles({ limit: 20 })
    const articles: Article[] = data?.pages.flatMap(p => p.items) ?? []

    if (isLoading) {
        return (
            <View flex={1} padding="$4" backgroundColor="$background" alignItems="center" justifyContent="center" gap="$4">
                <ActivityIndicator/>
                <Paragraph>Chargement...</Paragraph>
            </View>
        )
    }

    return (
        <ScreenView paddingBottom={0}>
            <View flex={1} padding="$4" alignItems="center" gap="$4">
                <H3 fontWeight="bold" alignSelf="flex-start">Actualités</H3>
                <FlatList
                    data={articles}
                    onEndReached={async () => {
                        if (hasNextPage && !isFetchingNextPage) {
                            await fetchNextPage()
                        }
                    }}
                    onEndReachedThreshold={1}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <>
                                <YStack height="$1"/>
                                <ActivityIndicator />
                            </>
                        ) : null
                    }
                    contentContainerStyle={{paddingBottom: 0}}
                    keyExtractor={(item: Article) => item.id}
                    ItemSeparatorComponent={() => <YStack height="$1"/>}
                    renderItem={({item}) => <ArticleCard article={item}/>}
                />
            </View>
        </ScreenView>
    )
}
