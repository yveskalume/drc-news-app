import {Button, H2, Paragraph, View, YStack} from "tamagui";
import PageView from "@/components/PageView";
import {useRouter} from "expo-router";
import Caption from "@/components/typography/Caption";
import AppLogo from "@/components/surface/AppLogo";

export default function Welcome() {
    const router = useRouter();

    return (
        <PageView paddingTop={0} paddingBottom={0} statusBarStyle="light">
            <View flex={1} backgroundColor="$background" padding="$4">
                <YStack alignItems="center" justifyContent="center" flex={1} gap="$4">
                    <AppLogo width={100} height={100}/>
                    <YStack width="100%" gap="$6" paddingHorizontal="$4">
                        <YStack gap="$3">
                            <H2 fontWeight="bold" lineHeight="$8" textAlign="center">
                                Bienvenue sur CongoNews
                            </H2>
                            <Paragraph textAlign="center" lineHeight="$1" marginTop="auto">
                                La première plateforme d'actualités intelligente qui vous aide à rester informé
                                sur l'actualité congolaise et internationale.
                            </Paragraph>
                        </YStack>

                        <YStack gap="$2">
                            <Button onPress={() => router.push("/(unauthed)/signin")} theme="accent" fontWeight="bold">
                                Se connecter
                            </Button>
                            <Button onPress={() => router.push("/(unauthed)/signup")} theme="gray" fontWeight="bold">
                                Ouvrir un compte
                            </Button>
                        </YStack>

                        <Caption textAlign="center">
                            En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir
                            lu notre politique de confidentialité.
                        </Caption>
                    </YStack>
                </YStack>
            </View>
        </PageView>
    );
}
