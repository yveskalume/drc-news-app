import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import AppLogo from "@/components/AppLogo";
import {useRouter} from "expo-router";
import AppBackButton from "@/components/controls/AppBackButton";
import Caption from "@/components/typography/Caption";
import {useEffect, useState} from "react";
import {setTokens} from "@/api/auth";
import * as Burnt from "burnt"
import {useErrorMessage} from "@/hooks/api/useErrorMessage";
import {useLogin} from "@/api/request";
import {ActivityIndicator} from "react-native";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {mutate: login, isPending, error} = useLogin();
    const message = useErrorMessage(error)
    const disabled = isPending || username.length === 0 || password.length === 0

    useEffect(() => {
        if (error) {
            Burnt.toast({
                title: "Erreur de connexion",
                message: message,
                preset: "error"
            })
        }
    }, [error, message])

    const handleLogin = () => {
        login({username, password}, {
            onSuccess: async (data) => {
                await setTokens(data.token, data.refreshToken)
                router.push("/(authed)/(tabs)/home")
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <ScreenView>
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

                    <Input onChangeText={setUsername} keyboardType="email-address" size="$large"
                           placeholder="Addresse e-mail"/>
                    <Input onChangeText={setPassword} keyboardType="visible-password" size="$large"
                           placeholder="Mot de passe"/>

                    <Button disabled={disabled} onPress={handleLogin} theme={disabled ? "disabled" : "accent"}
                            fontWeight="bold">
                        {isPending ? <ActivityIndicator/> : "Se connecter"}
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
        </ScreenView>
    )
}
