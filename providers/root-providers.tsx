import type React from "react";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {FontsLoaderProvider} from "@/providers/font-loader-provider";
import {TanstackQueryProvider} from "@/providers/tanstack-query-provider";
import {TamaguiConfigProvider} from "@/providers/tamagui-config-provider";

export const RootProviders = ({children}: React.PropsWithChildren) => (
    <GestureHandlerRootView style={{flex: 1}}>
        <TanstackQueryProvider>
            <SafeAreaProvider>
                <FontsLoaderProvider>
                    <TamaguiConfigProvider>
                        {children}
                    </TamaguiConfigProvider>
                </FontsLoaderProvider>
            </SafeAreaProvider>
        </TanstackQueryProvider>
    </GestureHandlerRootView>
);
