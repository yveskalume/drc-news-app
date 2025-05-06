import {Button, H5, Image, Paragraph, ScrollView, View, XStack, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {ArrowLeft} from "@tamagui/lucide-icons";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useArticleDetails} from "@/api/request";
import AppLoadingView from "@/components/AppLoadingView";
import Toast from "react-native-toast-message";
import {useErrorMessage} from "@/hooks/api/useErrorMessage";
import * as WebBrowser from "expo-web-browser";

const CategoryPill = ({category}: { category: string }) => {
    return (
        <Paragraph fontSize="$2">
            {category}
        </Paragraph>
    )
}

export default function ArticleDetails() {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const {data, isLoading, error} = useArticleDetails(id as string);
    const article = data ?? undefined;

    const handleReadIntegrality = async () => {
        await WebBrowser.openBrowserAsync(article!.link)
    }

    if (error) {
        Toast.show((
            {
                type: "error",
                text1: "Erreur",
                text2: useErrorMessage(error)
            }
        ))
        router.replace("/(authed)/(tabs)/articles");
    }

    if (isLoading || article === undefined) {
        return <AppLoadingView/>
    }

    return (
        <ScreenView paddingBottom={0}>
            <View flex={1} alignItems="center" gap="$4">
                <ScrollView>
                    <YStack>
                        {article.metadata?.image && (
                            <Image
                                borderTopEndRadius="$2"
                                borderTopStartRadius="$2"
                                source={{uri: article.metadata.image, cache: 'force-cache'}}
                                objectFit="cover"
                                width="100%"
                                height="300"
                                backgroundColor="$gray10"
                            />
                        )}
                        <Button
                            chromeless
                            position="absolute"
                            top="$4"
                            left="$4"
                            size="$4"
                            width="$4"
                            height="$4"
                            borderRadius="$12"
                            backgroundColor="$background"
                            icon={<ArrowLeft size="$1"/>}
                            onPress={() => router.navigate("/(authed)/(tabs)/articles")}
                        />
                    </YStack>
                    <YStack padding="$4" gap="$3" backgroundColor="$background">
                        <ScrollView>
                            <XStack gap="$2" flexWrap="wrap">
                                {article.categories.map((category, index) => (
                                    <CategoryPill key={index} category={category.toLowerCase()}/>
                                ))}
                            </XStack>
                        </ScrollView>
                        <H5 fontWeight="bold" marginBottom="$1">
                            {article.title}
                        </H5>
                        <XStack justifyContent="space-between" marginTop="$4">
                            <Paragraph size="$2" color="$gray10">
                                {article.source}
                            </Paragraph>
                            <Paragraph size="$2" color="$gray10">
                                {new Date(article.publishedAt).toDateString()}
                            </Paragraph>
                        </XStack>

                        <Paragraph size="$3" marginTop="$2">
                            {article.body.trim()}
                        </Paragraph>
                    </YStack>
                </ScrollView>
                <XStack width="100%" paddingHorizontal="$4" paddingBottom="$4">
                    <Button width="100%" onPress={handleReadIntegrality} theme="accent" fontWeight="bold">
                        Lire l'intégralité
                    </Button>
                </XStack>
            </View>
        </ScreenView>
    );
}
