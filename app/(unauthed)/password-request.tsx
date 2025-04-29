import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import PageView from "@/components/PageView";
import AppLogo from "@/components/surface/AppLogo";
import {useRouter} from "expo-router";
import AppBackButton from "@/components/controls/AppBackButton";

export default function PasswordRequest() {
    const router = useRouter()

    return (
        <PageView>
            <View flex={1} backgroundColor="$background" padding="$4">
                {router.canGoBack() && <AppBackButton onPress={router.back}/>}
                <View flex={0.2} alignItems="center" justifyContent="center">
                    <AppLogo />
                </View>
                <YStack flex={0.8} gap="$4" width="100%" justifyContent="flex-start">
                    <YStack marginBottom="$4">
                        <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Mot de passe oublié ?</H3>
                        <Paragraph textAlign="center" lineHeight="$1" marginTop="auto" paddingHorizontal="$4">
                            Veuillez entrer votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
                        </Paragraph>
                    </YStack>

                    <Input
                        size="$large"
                        placeholder="Addresse e-mail"
                    />

                    <Button theme="accent" color="white" fontWeight="bold">
                        Réinitialiser le mot de passe
                    </Button>
                </YStack>
            </View>
        </PageView>
    )
}
