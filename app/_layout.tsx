import React from "react";
import {Stack} from 'expo-router';
import {RootProviders} from "@/providers/RootProviders";
import {Theme} from "tamagui";
import {useColorScheme} from "react-native";

export {ErrorBoundary} from "expo-router";

export default function RootLayout() {
    const colorScheme = useColorScheme()

    return (
        <React.StrictMode>
            <RootProviders>
                <Theme name={colorScheme || "dark"}>
                    <Stack screenOptions={{headerShown: false}} />
                </Theme>
            </RootProviders>
        </React.StrictMode>
    );
}
