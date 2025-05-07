import {Redirect, Stack} from "expo-router";
import {useAuth} from "@/providers/AuthProvider";

export default function AuthedLayout() {
    const auth = useAuth()

    if (!auth.isReady) {
        return null;
    }

    if (!auth.isLoggedIn) {
        return <Redirect href="/signin" />
    }


    return <Stack screenOptions={{headerShown: false}} />
}
