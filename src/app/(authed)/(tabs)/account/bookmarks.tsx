import { Search } from "@tamagui/lucide-icons";
import { ActivityIndicator } from "react-native";
import { Button, YStack } from "tamagui";

import { useLogout } from "@/api/identity-and-access/login";
import { useAuth } from "@/providers/AuthProvider";
import IconButton from "@/ui/components/controls/IconButton";
import ScreenView from "@/ui/components/layout/ScreenView";

export default function Bookmarks() {
    const authState = useAuth();
    const { mutate: logoutRequest, isPending } = useLogout();

    const handleLogout = async () => {
        logoutRequest(undefined, {
            onSuccess: () => authState.logout(),
            onError: () => authState.logout(),
        });
    };

    return (
        <ScreenView>
            <ScreenView.Heading
                title="Bookmarks"
                trailingActions={<IconButton onPress={() => {}} icon={<Search size="$1" />} />}
            />

            <YStack width="100%">
                <Button
                    disabled={isPending}
                    onPress={handleLogout}
                    theme={isPending ? "disabled" : "accent"}
                    fontWeight="bold"
                >
                    {isPending ? <ActivityIndicator /> : "Déconnexion"}
                </Button>
            </YStack>
        </ScreenView>
    );
}
