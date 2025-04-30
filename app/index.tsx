import {Redirect} from "expo-router";
import {useAuth} from "@/providers/AuthProvider";

export default function Index() {
    const auth = useAuth();

    return auth.isLoggedIn ?
        <Redirect href="/(authed)/(tabs)/home"/> :
        <Redirect href="/(unauthed)/welcome"/>;
}
