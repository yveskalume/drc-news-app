import {Button, Input, Label, Paragraph, YStack} from "tamagui";
import ScreenView from "@/ui/components/layout/ScreenView";
import {Link, useRouter} from "expo-router";
import Caption from "@/ui/components/typography/Caption";
import React, {useMemo, useState} from "react";
import {useRegister} from "@/api/request";
import Toast from "react-native-toast-message";
import {ActivityIndicator} from "react-native";
import {safeMessage} from "@/api/api";
import BackButton from "@/ui/components/controls/BackButton";
import Heading from "@/ui/components/typography/Heading";

export default function SingUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {mutate: registerRequest, isPending, error} = useRegister()

    const isFormValid = useMemo(() => {
        return email.trim().length > 0
            && password.trim().length > 0
            && name.trim().length > 0
    }, [email, password, name]);

    if (error) {
        Toast.show({
            text1: "Erreur",
            text2: safeMessage(error),
            type: "error",
        })
    }

    const handleSubmit = () => {
        registerRequest({name, email, password}, {
            onSuccess: () => {
                Toast.show({
                    text1: "Félicitations !",
                    text2: "les détails de votre compte vous ont été envoyés par e-mail.",
                    type: "success",
                })
                router.replace("/(unauthed)/signin")
            },
            onError: (error) => {
                Toast.show({
                    text1: "Erreur",
                    text2: safeMessage(error),
                    type: "error",
                })
            }
        })
    }

    return (
        <ScreenView>
            {router.canGoBack() && <BackButton onPress={() => router.back()}/>}
            <YStack flex={1} gap="$4" width="100%" justifyContent="flex-start">
                <YStack gap="$4">
                    <Heading>Inscription</Heading>
                    <Paragraph>
                        Rejoignez la communauté CongoNews et restez informé des dernières actualités
                    </Paragraph>
                </YStack>

                <YStack gap="$2">
                    <YStack>
                        <Label>Nom</Label>
                        <Input
                            onChangeText={setName}
                            autoCapitalize="none"
                            autoCorrect={false}
                            size="$large"
                            placeholder="Nom d'utilisateur"
                        />
                    </YStack>

                    <YStack>
                        <Label>Email</Label>
                        <Input
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            size="$large"
                            placeholder="Addresse e-mail"
                        />
                    </YStack>

                    <YStack>
                        <Label>Mot de passe</Label>
                        <Input
                            onChangeText={setPassword}
                            secureTextEntry
                            size="$large"
                            placeholder="Mot de passe"
                        />
                    </YStack>
                </YStack>
                <Caption>
                    En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
                <Link href="/signin">
                    <Paragraph>Vous avez un compte ? Connectez-vous</Paragraph>
                </Link>
            </YStack>
            <Button
                width="100%"
                onPress={handleSubmit}
                disabled={!isFormValid || isPending}
                theme={!isFormValid || isPending ? "disabled" : "accent"}
                fontWeight="bold"
            >
                {isPending ? <ActivityIndicator/> : "Créer un compte"}
            </Button>
        </ScreenView>
    )
}
