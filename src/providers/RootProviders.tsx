import type React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/providers/AuthProvider";
import { FontsLoaderProvider } from "@/providers/FontsLoaderProvider";
import { NetworkProvider } from "@/providers/NetworkProvider";
import { TamaguiConfigProvider } from "@/providers/TamaguiConfigProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";

export const RootProviders = ({ children }: React.PropsWithChildren) => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <TanstackQueryProvider>
            <SafeAreaProvider>
                <FontsLoaderProvider>
                    <TamaguiConfigProvider>
                        <NetworkProvider>
                            <AuthProvider>{children}</AuthProvider>
                        </NetworkProvider>
                    </TamaguiConfigProvider>
                </FontsLoaderProvider>
            </SafeAreaProvider>
        </TanstackQueryProvider>
    </GestureHandlerRootView>
);
