import {Button, H3, Image, View, YStack} from "tamagui";
import PageView from "@/components/PageView";
import {useRouter} from "expo-router";
import BackgroundOverlay from "@/components/surface/BackgroundOverlay";
import Caption from "@/components/typography/Caption";
import AppLogo from "@/components/surface/AppLogo";

const HeroImage = () => (
    <View flex={0.50} justifyContent="center" alignItems="center">
        <Image
            source={{uri: 'https://images.pexels.com/photos/9567615/pexels-photo-9567615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}}
            backgroundSize="cover"
            width="100%"
            height="100%"
            objectFit="cover"
        />
        <BackgroundOverlay/>
    </View>
);

export default function Welcome() {
    const router = useRouter();

    return (
        <PageView paddingTop={0} paddingBottom={0} statusBarStyle="light">
            <View flex={1} backgroundColor="$background">
                <HeroImage/>
                <View flex={0.4} alignItems="center" padding="$4">
                    <AppLogo/>
                    <YStack width="100%" alignItems="center" justifyContent="center" padding="$4">
                        <H3 fontSize="$6" fontWeight="bold">
                            Welcome to CongoNews
                        </H3>

                        <YStack gap="$2" width="100%" marginTop="$4">
                            <Button onPress={() => router.push("/(unauthed)/signin")} theme="accent" fontWeight="bold">
                                Se connecter
                            </Button>
                            <Button onPress={() => router.push("/(unauthed)/signup")} theme="gray" fontWeight="bold">
                                Ouvrir un compte
                            </Button>
                        </YStack>

                        <Caption textAlign="center">
                            En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir
                            lu notre politique de confidentialité.
                        </Caption>
                    </YStack>
                </View>
            </View>
        </PageView>
    );
}
