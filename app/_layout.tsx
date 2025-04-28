import React, {useEffect} from "react";

import {Stack} from 'expo-router';
import * as SplashScreen from "expo-splash-screen";

import {RootProviders} from "@/providers/RootProviders";
import {Theme} from "tamagui";
import {useColorScheme} from "react-native";

export {ErrorBoundary} from "expo-router";

export default function RootLayout() {
    const colorScheme = useColorScheme()

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
    }, [])

    return (
        <React.StrictMode>
            <RootProviders>
                <Theme name={colorScheme || "dark"}>
                    <Stack screenOptions={{headerShown: false}}/>
                </Theme>
            </RootProviders>
        </React.StrictMode>
    );
}
