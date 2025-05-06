import {Button, Card, H3, H4, Image, Paragraph, ScrollView, View, XStack, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {Article} from "@/api/types";
import {useInfiniteArticles} from "@/api/request";
import {ActivityIndicator, FlatList, Modal, Pressable} from "react-native";
import {useState} from "react";
import {useRouter} from "expo-router";
import AppLoadingView from "@/components/AppLoadingView";

const ArticleCard = ({article}: { article: Article }) => {
    return (
        <Card theme="accent" elevate>
            {article.metadata?.image && (
                <Image
                    borderTopEndRadius="$2"
                    borderTopStartRadius="$2"
                    source={{uri: article.metadata.image, cache: 'force-cache'}}
                    objectFit="cover"
                    width="100%"
                    height="200"
                />
            )}
            <YStack padding="$3">
                <Paragraph fontWeight="600" fontSize="$5" marginBottom="$1">
                    {article.title}
                </Paragraph>
                <YStack gap="$3">
                    <Paragraph size="$2">
                        {article.categories.join(', ').toLowerCase()}
                    </Paragraph>
                    <Paragraph size="$3" numberOfLines={3}>
                        {article.metadata?.description ?? article.body.trim().substring(0, 100)}...
                    </Paragraph>
                    <XStack justifyContent="space-between" alignItems="center" marginBottom="$1">
                        <Paragraph size="$2" fontWeight="bold">
                            {article.source}
                        </Paragraph>
                        <Paragraph size="$2">
                            {new Date(article.publishedAt).toDateString()}
                        </Paragraph>
                    </XStack>
                </YStack>
            </YStack>
        </Card>
    );
}

export default function Index() {
    const router = useRouter();
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [sheetPresenting, setSheetPresenting] = useState(false);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteArticles({limit: 20})
    const articles: Article[] = data?.pages.flatMap(p => p.items) ?? []

    if (isLoading) {
        return (
            <AppLoadingView />
        );
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
                                <ActivityIndicator/>
                            </>
                        ) : null
                    }
                    contentContainerStyle={{paddingBottom: 0}}
                    keyExtractor={(item: Article) => item.id}
                    ItemSeparatorComponent={() => <YStack height="$1"/>}
                    renderItem={({item}) => (
                        <Pressable onPress={() => router.push(`/(authed)/(tabs)/articles/${item.id}`)}>
                            <ArticleCard article={item}/>
                        </Pressable>
                    )}
                />
            </View>
        </ScreenView>
    )
}
