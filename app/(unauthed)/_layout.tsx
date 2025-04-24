import { Stack } from "expo-router";

export default function UnAuthedLayout() {
    return <Stack screenOptions={{ headerShown: false }} />;
}
