import type React from "react";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import {YStack} from "tamagui";
import {StatusBar} from "expo-status-bar";

type ScreenViewProps = React.ComponentProps<typeof YStack> & {
    showStatusBar?: boolean;
    statusBarStyle?: "auto" | "inverted" | "light" | "dark";
    statusBarBackgroundColor?: string;
    children: React.ReactNode;
};

export default function ScreenView(props: React.PropsWithChildren<ScreenViewProps>) {
    const {
        showStatusBar = true,
        statusBarStyle = "auto",
        statusBarBackgroundColor = "transparent",
        padding,
        children,
        ...rest
    } = props;
    const insets = useSafeAreaInsets();

    return (
        <>
            {showStatusBar ? <StatusBar style={statusBarStyle} backgroundColor={statusBarBackgroundColor}/> : null}
            <YStack
                flex={1}
                paddingBottom={insets.bottom}
                paddingTop={insets.top}
                gap="$4"
                paddingHorizontal={padding ?? props.padding ?? "$4"}
                alignItems="center"
                backgroundColor="$background"
                {...rest}
            >
                {children}
            </YStack>
        </>
    );
}
