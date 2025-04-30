import { Link, Stack } from 'expo-router';
import {H5, Paragraph, View, YStack} from "tamagui";
import ScreenView from "@/components/ScreenView";
import AppLogo from "@/components/AppLogo";

export default function NotFoundScreen() {
  return (
      <ScreenView>
          <Stack.Screen options={{ title: 'Oops !' }} />
          <View flex={1} backgroundColor="$background" padding="$4">
              <YStack alignItems="center" justifyContent="center" flex={1} gap="$4">
                  <AppLogo width={100} height={100}/>
                  <YStack width="100%" gap="$6" alignItems="center" paddingHorizontal="$4">
                      <YStack>
                          <H5 fontWeight="bold" lineHeight="$8" textAlign="center">
                              Une erreur s'est produite
                          </H5>
                          <Paragraph textAlign="center" lineHeight="$1" marginTop="auto">
                              Nous avons une difficulté à charger la page que vous recherchez.
                          </Paragraph>
                      </YStack>

                      <Link href="/(unauthed)/welcome">
                          <Paragraph>Recommencer</Paragraph>
                      </Link>
                  </YStack>
              </YStack>
          </View>
      </ScreenView>
  );
}
