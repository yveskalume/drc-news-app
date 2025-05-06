import {ActivityIndicator} from "react-native";
import {Paragraph, View} from "tamagui";

export default function AppLoadingView() {
    return (
        <View flex={1} padding="$4" backgroundColor="$background" alignItems="center" justifyContent="center"
              gap="$4">
            <ActivityIndicator/>
            <Paragraph>Chargement...</Paragraph>
        </View>
    );
}
