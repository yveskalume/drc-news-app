import type React from "react";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {FontsLoaderProvider} from "@/providers/FontsLoaderProvider";
import {TanstackQueryProvider} from "@/providers/TanstackQueryProvider";
import {TamaguiConfigProvider} from "@/providers/TamaguiConfigProvider";
import {AuthProvider} from "@/providers/AuthProvider";

export const RootProviders = ({children}: React.PropsWithChildren) => (
    <GestureHandlerRootView style={{flex: 1}}>
        <TanstackQueryProvider>
            <SafeAreaProvider>
                <FontsLoaderProvider>
                    <TamaguiConfigProvider>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </TamaguiConfigProvider>
                </FontsLoaderProvider>
            </SafeAreaProvider>
        </TanstackQueryProvider>
    </GestureHandlerRootView>
);
