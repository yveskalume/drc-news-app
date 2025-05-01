import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import AppLogo from "@/components/AppLogo";
import {useRouter} from "expo-router";
import AppBackButton from "@/components/controls/AppBackButton";
import {useState} from "react";
import {usePasswordForgotten} from "@/api/request";
import {useErrorMessage} from "@/hooks/api/useErrorMessage";
import {ActivityIndicator} from "react-native";
import Toast from "react-native-toast-message";

export default function PasswordRequest() {
    const [email, setEmail] = useState("")
    const {mutate: request, isPending} = usePasswordForgotten()
    const disabled = isPending || email.length === 0
    const router = useRouter();

    const handleRequest = () => {
        request({email}, {
            onSuccess: () => {
                Toast.show({
                    text1: "Succès",
                    text2: "Un mail avec les instructions vous a été envoyé",
                    type: "success"
                })
                router.push("/(unauthed)/signin")
            },
            onError: error => {
                Toast.show({
                    text1: "Erreur de connexion",
                    text2: useErrorMessage(error),
                    type: "error"
                })
            }
        })
    }

    return (
        <ScreenView>
            <View flex={1} backgroundColor="$background" padding="$4">
                {router.canGoBack() && <AppBackButton onPress={router.back}/>}
                <View flex={0.2} alignItems="center" justifyContent="center">
                    <AppLogo/>
                </View>
                <YStack flex={0.8} gap="$4" width="100%" justifyContent="flex-start">
                    <YStack marginBottom="$4">
                        <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Mot de passe oublié ?</H3>
                        <Paragraph textAlign="center" lineHeight="$1" marginTop="auto" paddingHorizontal="$4">
                            Veuillez entrer votre adresse e-mail pour recevoir un lien de réinitialisation de mot de
                            passe.
                        </Paragraph>
                    </YStack>

                    <Input onChangeText={setEmail}
                       autoCapitalize="none"
                       autoCorrect={false}
                       keyboardType="email-address"
                       size="$large"
                       placeholder="Addresse e-mail"
                    />

                    <Button disabled={disabled} onPress={handleRequest} theme={disabled ? "disabled" : "accent"}
                            fontWeight="bold">
                        {isPending ? <ActivityIndicator/> : "Réinitialiser le mot de passe"}
                    </Button>
                </YStack>
            </View>
        </ScreenView>
    )
}
