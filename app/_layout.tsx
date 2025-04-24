import React, {useEffect} from "react";

import {Stack} from 'expo-router';
import * as SplashScreen from "expo-splash-screen";

import {RootProviders} from "@/providers/RootProviders";
import {SafeAreaView} from "react-native-safe-area-context";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
    }, [])

    return (
        <React.StrictMode>
            <RootProviders>
                <Stack screenOptions={{headerShown: false}} />
            </RootProviders>
        </React.StrictMode>
    );
}
