import {Button, H3, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import {useAuth} from "@/providers/AuthProvider";

export default function Settings() {
    const authState = useAuth();

    const handleLogout = async () => {
        authState.logout()
    }

    return (
        <ScreenView>
            <View flex={1} padding="$4" alignItems="center" gap="$4">
                <H3 fontWeight="bold" alignSelf="flex-start">Paramètres</H3>

                <YStack width="100%">
                    <Button onPress={handleLogout} theme="accent" fontWeight="bold">Déconnexion</Button>
                </YStack>
            </View>
        </ScreenView>
    )
}
