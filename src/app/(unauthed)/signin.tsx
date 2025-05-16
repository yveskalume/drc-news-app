import React, { useMemo, useState } from "react";

import { Link, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Button, Input, Label, Paragraph, XStack, YStack } from "tamagui";

import { ErrorResponse, safeMessage } from "@/api/client";
import { LoginResponse, useLogin } from "@/api/identity-and-access/login";
import { useAuth } from "@/providers/AuthProvider";
import BackButton from "@/ui/components/controls/BackButton";
import ScreenView from "@/ui/components/layout/ScreenView";
import Caption from "@/ui/components/typography/Caption";
import Heading from "@/ui/components/typography/Heading";

export default function SignIn() {
    const auth = useAuth();
    const router = useRouter();

    if (auth.isLoggedIn) {
        router.replace("/(authed)/(tabs)/articles");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: loginRequest, isPending } = useLogin();

    const isFormValid = useMemo(() => {
        return email.trim().length > 0 && password.trim().length > 0;
    }, [email, password]);

    const handleSubmit = () => {
        loginRequest(
            { username: email, password },
            {
                onSuccess: async (data: LoginResponse) => {
                    auth.login(data.token, data.refresh_token);
                    Toast.show({ text1: "Connexion réussie", type: "success" });
                },
                onError: (error: ErrorResponse) => {
                    Toast.show({
                        text1: "Erreur de connexion",
                        text2: safeMessage(error),
                        type: "error",
                    });
                },
            }
        );
    };

    return (
        <ScreenView>
            {router.canGoBack() && <BackButton onPress={() => router.back()} />}
            <YStack flex={1} gap="$4" width="100%" justifyContent="flex-start">
                <YStack gap="$4">
                    <Heading>Connexion</Heading>
                    <Paragraph>Bienvenue sur CongoNews, la plateforme d&#39;actualités intelligente</Paragraph>
                </YStack>

                <YStack gap="$2">
                    <YStack>
                        <Label>Email</Label>
                        <Input
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            size="$large"
                            placeholder="Adresse e-mail"
                        />
                    </YStack>
                    <YStack>
                        <XStack justifyContent="space-between" alignItems="center">
                            <Label>Mot de passe</Label>
                            <Link href="/password-request" asChild>
                                <Paragraph color="$accent6"> Mot de passe oublié ?</Paragraph>
                            </Link>
                        </XStack>
                        <Input
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            size="$large"
                            placeholder="Mot de passe"
                        />
                    </YStack>
                </YStack>

                <Caption>
                    En continuant, vous acceptez les conditions d&#39;utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
                <Link href="/signup" asChild>
                    <Paragraph>Vous n&#39;avez pas de compte ? Créer un compte</Paragraph>
                </Link>
            </YStack>
            <Button
                width="100%"
                disabled={!isFormValid || isPending}
                onPress={handleSubmit}
                theme={!isFormValid || isPending ? "disabled" : "accent"}
                fontWeight="bold"
            >
                {isPending ? <ActivityIndicator /> : "Se connecter"}
            </Button>
        </ScreenView>
    );
}
