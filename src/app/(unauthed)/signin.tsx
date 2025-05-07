import {Button, H3, Input, Paragraph, View, XStack, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import AppIcon from "@/components/AppIcon";
import {useRouter} from "expo-router";
import Caption from "@/components/typography/Caption";
import {useMemo, useState} from "react";
import {useLogin} from "@/api/request";
import {ActivityIndicator} from "react-native";
import {useAuth} from "@/providers/AuthProvider";
import {LoginResponse} from "@/api/types";
import Toast from "react-native-toast-message";
import {safeMessage} from "@/api/api";

export default function SignIn() {
    const auth = useAuth();
    const router = useRouter();

    if (auth.isLoggedIn) {
        router.replace("/(authed)/(tabs)/articles")
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {mutate: loginRequest, isPending} = useLogin();

    const isFormValid = useMemo(() => {
        return email.trim().length > 0 && password.trim().length > 0;
    }, [email, password]);

    const handleSubmit = () => {
        loginRequest({username: email, password}, {
            onSuccess: async (data: LoginResponse) => {
                auth.login(data.token, data.refresh_token);
                Toast.show({text1: "Connexion réussie", type: "success"});
            },
            onError: error => {
                Toast.show({
                    text1: "Erreur de connexion",
                    text2: safeMessage(error),
                    type: "error",
                });
            },
        });
    };

    return (
        <ScreenView>
            <View flex={0.2} alignItems="center" justifyContent="center">
                <AppIcon/>
            </View>

            <YStack flex={0.8} gap="$4" width="100%" justifyContent="flex-start">
                <YStack marginBottom="$4">
                    <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Se connecter</H3>
                    <Paragraph textAlign="center" lineHeight="$1" paddingHorizontal="$4">
                        Bienvenue sur CongoNews, la plateforme d'actualités intelligente
                    </Paragraph>
                </YStack>

                <Input
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    size="$large"
                    placeholder="Adresse e-mail"
                />
                <Input
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    size="$large"
                    placeholder="Mot de passe"
                />

                <Button
                    disabled={!isFormValid || isPending}
                    onPress={handleSubmit}
                    theme={!isFormValid || isPending ? "disabled" : "accent"}
                    fontWeight="bold"
                >
                    {isPending ? <ActivityIndicator/> : "Se connecter"}
                </Button>

                <XStack justifyContent="space-between">
                    <Button onPress={() => router.push("/signup")} chromeless>
                        Créer un compte
                    </Button>
                    <Button onPress={() => router.push("/password-request")} chromeless>
                        Mot de passe oublié ?
                    </Button>
                </XStack>
            </YStack>

            <Caption textAlign="center">
                En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir lu
                notre politique de confidentialité.
            </Caption>
        </ScreenView>
    );
}
