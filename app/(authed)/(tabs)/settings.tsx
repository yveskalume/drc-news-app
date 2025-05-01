import {Button, H3, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {useAuth} from "@/providers/AuthProvider";
import {useLogout} from "@/api/request";
import {ActivityIndicator} from "react-native";

export default function Settings() {
    const authState = useAuth();
    const {mutate: logoutRequest, isPending} = useLogout()

    const handleLogout = async () => {
        logoutRequest(undefined, {
            onSuccess: () => authState.logout(),
            onError: () => authState.logout()
        })
    }

    return (
        <ScreenView>
            <View flex={1} padding="$4" alignItems="center" gap="$4">
                <H3 fontWeight="bold" alignSelf="flex-start">Paramètres</H3>

                <YStack width="100%">
                    <Button
                        disabled={isPending}
                        onPress={handleLogout}
                        theme={isPending ? "disabled" : "accent"}
                        fontWeight="bold"
                    >
                        {isPending ? <ActivityIndicator/> : "Déconnexion"}
                    </Button>
                </YStack>
            </View>
        </ScreenView>
    )
}
