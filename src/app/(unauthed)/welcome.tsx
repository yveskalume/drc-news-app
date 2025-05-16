import { Link, useRouter } from "expo-router";
import { Button, H2, Paragraph, YStack } from "tamagui";

import AppIcon from "@/ui/components/AppIcon";
import ScreenView from "@/ui/components/layout/ScreenView";
import Caption from "@/ui/components/typography/Caption";

export default function Welcome() {
    const router = useRouter();

    return (
        <ScreenView justifyContent="center">
            <AppIcon width={100} height={100} />
            <YStack width="100%" gap="$6">
                <YStack gap="$3">
                    <H2 fontWeight="bold" lineHeight="$8" textAlign="center">
                        Bienvenue sur CongoNews
                    </H2>
                    <Paragraph textAlign="center" lineHeight="$1" marginTop="auto">
                        La première plateforme d&#39;actualités intelligente qui vous aide à rester informé sur
                        congolaise et internationale.
                    </Paragraph>
                </YStack>

                <YStack gap="$4">
                    <Button onPress={() => router.push("/signin")} theme="accent" fontWeight="bold">
                        Se connecter
                    </Button>
                    <Link href="/signup" asChild>
                        <Paragraph textAlign="center">Ouvrir un compte</Paragraph>
                    </Link>
                </YStack>

                <Caption textAlign="center">
                    En continuant, vous acceptez les conditions d&#39;utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
            </YStack>
        </ScreenView>
    );
}
