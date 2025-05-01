import {Button, H3, Input, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {useRouter} from "expo-router";
import AppLogo from "@/components/AppLogo";
import AppBackButton from "@/components/controls/AppBackButton";
import Caption from "@/components/typography/Caption";
import {useMemo, useState} from "react";
import {useRegister} from "@/api/request";
import Toast from "react-native-toast-message";
import {useErrorMessage} from "@/hooks/api/useErrorMessage";
import {ActivityIndicator} from "react-native";

export default function SingUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const {mutate: registerRequest, isPending} = useRegister()

    const isFormValid = useMemo(() => {
        return email.trim().length > 0
            && password.trim().length > 0
            && name.trim().length > 0
    }, [email, password, name]);

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
                    text2: useErrorMessage(error),
                    type: "error",
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
                        <H3 fontWeight="bold" textAlign="center" marginBottom="$3">Nous rejoindre</H3>
                        <Paragraph textAlign="center" lineHeight="$1" marginTop="auto" paddingHorizontal="$4">
                            Optez pour CongoNews, la plateforme d'actualités intelligente
                        </Paragraph>
                    </YStack>

                    <Input
                        onChangeText={setName}
                        autoCapitalize="none"
                        autoCorrect={false}
                        size="$large"
                        placeholder="Nom d'utilisateur"
                    />
                    <Input
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        size="$large"
                        placeholder="Addresse e-mail"
                    />
                    <Input
                        onChangeText={setPassword}
                        secureTextEntry
                        size="$large"
                        placeholder="Mot de passe"
                    />

                    <Button
                        onPress={handleSubmit}
                        disabled={!isFormValid || isPending}
                        theme={!isFormValid || isPending ? "disabled" : "accent"}
                        fontWeight="bold"
                    >
                        {isPending ? <ActivityIndicator /> : "Créer un compte"}
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
