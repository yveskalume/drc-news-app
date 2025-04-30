import {Redirect} from "expo-router";
import {useLoggedIn} from "@/api/auth";

export default function Index() {
    return useLoggedIn() ?
        <Redirect href="/(authed)/(tabs)/home"/> :
        <Redirect href="/(unauthed)/welcome"/>;
}
