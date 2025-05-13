import {Button, YStack} from "tamagui";
import ScreenView from "@/ui/components/screen/ScreenView";
import {useAuth} from "@/providers/AuthProvider";
import {useLogout} from "@/api/request";
import {ActivityIndicator} from "react-native";
import IconButton from "@/ui/components/controls/IconButton";
import {Search} from "@tamagui/lucide-icons";
import AppIcon from "@/ui/components/AppIcon";

export default function Bookmarks() {
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
            <ScreenView.Heading
                leadingAction={<AppIcon width={35} height={35} />}
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
                    {isPending ? <ActivityIndicator/> : "Déconnexion"}
                </Button>
            </YStack>
        </ScreenView>
    )
}
