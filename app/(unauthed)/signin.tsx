import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import PageView from "@/components/PageView";
import AppLogo from "@/components/surface/AppLogo";
import {useRouter} from "expo-router";
import AppBackButton from "@/components/controls/AppBackButton";
import Caption from "@/components/typography/Caption";

export default function SignIn() {
    const router = useRouter()

    return (
        <PageView>
            <View flex={1} backgroundColor="$background" padding="$4">
                {router.canGoBack() && <AppBackButton onPress={() => router.back()}/>}
                <View flex={0.2} alignItems="center" justifyContent="center">
                    <AppLogo/>
                </View>
                <YStack flex={0.8} gap="$4" width="100%" justifyContent="flex-start">
                    <YStack marginBottom="$4">
                        <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Se connecter</H3>
                        <Paragraph textAlign="center" lineHeight="$1" marginTop="auto" paddingHorizontal="$4">
                            Bienvenue sur CongoNews, la plateforme d'actualités intelligente
                        </Paragraph>
                    </YStack>

                    <Input size="$large" placeholder="Addresse e-mail"/>
                    <Input size="$large" placeholder="Mot de passe"/>

                    <Button onPress={router.back} theme="accent" fontWeight="bold">
                        Se connecter
                    </Button>
                    <Button onPress={() => router.push("/(unauthed)/password-request")} chromeless>
                        Mot de passe oublié ?
                    </Button>
                </YStack>

                <Caption textAlign="center">
                    En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
            </View>
        </PageView>
    )
}
