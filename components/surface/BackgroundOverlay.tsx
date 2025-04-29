import {View} from "tamagui";

export default function BackgroundOverlay() {
    return (
        <View
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            backgroundColor="rgba(0,0,0,0.5)"
        />
    );
}
