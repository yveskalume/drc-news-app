import React from "react";

import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import * as SplashScreen from "expo-splash-screen";

import {RootProviders} from "@/providers/root-providers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    return (
        <React.StrictMode>
            <RootProviders>
                <Stack screenOptions={{headerShown: true}} />
                <StatusBar style="auto"/>
            </RootProviders>
        </React.StrictMode>
    );
}
