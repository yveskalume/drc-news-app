import { Link, Stack } from 'expo-router';
import {H1, Paragraph, View} from "tamagui";
import PageView from "@/components/PageView";

export default function NotFoundScreen() {
  return (
    <PageView showStatusBar={false}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View flex={1} alignItems="center" justifyContent="center" padding={20}>
        <H1>This screen doesn't exist.</H1>
        <Link href="/(authed)/(tabs)/home">
          <Paragraph>Go to home screen!</Paragraph>
        </Link>
      </View>
    </PageView>
  );
}
