import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {useRouter} from "expo-router";
import AppLogo from "@/components/AppLogo";
import AppBackButton from "@/components/controls/AppBackButton";
import Caption from "@/components/typography/Caption";

export default function SingUp() {
    const router = useRouter()

    return (
        <ScreenView>
            <View flex={1} backgroundColor="$background" padding="$4">
                {router.canGoBack() && <AppBackButton onPress={router.back}/>}
                <View flex={0.2} alignItems="center" justifyContent="center">
                    <AppLogo/>
                </View>
                <YStack flex={0.8} gap="$4" width="100%" justifyContent="flex-start">
                    <YStack marginBottom="$4">
                        <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Nous rejoindre</H3>
                        <Paragraph textAlign="center" lineHeight="$1" marginTop="auto" paddingHorizontal="$4">
                            Optez pour CongoNews, la plateforme d'actualités intelligente
                        </Paragraph>
                    </YStack>

                    <Input size="$large" placeholder="Nom d'utilisateur"/>
                    <Input size="$large" placeholder="Addresse e-mail"/>
                    <Input size="$large" placeholder="Mot de passe"/>

                    <Button onPress={() => router.replace("/signin")} theme="accent" fontWeight="bold">
                        Ouvrir un compte
                    </Button>
                </YStack>

                <Caption textAlign="center">
                    En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
            </View>
        </ScreenView>
    )
}
