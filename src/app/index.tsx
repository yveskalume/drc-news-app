import { Redirect } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";

export default function Index() {
    const auth = useAuth();

    if (!auth.isReady) {
        return null;
    }

    return auth.isLoggedIn ? <Redirect href="/(authed)/(tabs)/articles" /> : <Redirect href="/(unauthed)/welcome" />;
}
