import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/ui/components/screen/ScreenView";
import AppIcon from "@/ui/components/AppIcon";
import {Link, useRouter} from "expo-router";
import {useState} from "react";
import {usePasswordForgotten} from "@/api/request";
import {ActivityIndicator} from "react-native";
import Toast from "react-native-toast-message";
import {safeMessage} from "@/api/api";

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
                    text2: safeMessage(error),
                    type: "error"
                })
            }
        })
    }

    return (
        <ScreenView>
            <View flex={0.2} alignItems="center" justifyContent="center">
                <AppIcon/>
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
                <Link href="/signin" asChild>
                    <Paragraph textAlign="center">Se connecter</Paragraph>
                </Link>
            </YStack>
        </ScreenView>
    )
}
