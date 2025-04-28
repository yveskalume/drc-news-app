import {Button, Paragraph, View, YStack, Image, H3} from "tamagui";
import PageView from "@/components/PageView";
import {useRouter} from "expo-router";

const BackgroundOverlay = () => (
    <View
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        backgroundColor="rgba(0,0,0,0.5)"
    />
);

const HeroImage = () => (
    <View flex={0.50} justifyContent="center" alignItems="center">
        <Image
            source={{ uri: 'https://images.pexels.com/photos/9567615/pexels-photo-9567615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            backgroundSize="cover"
            width="100%"
            height="100%"
            objectFit="cover"
        />
        <BackgroundOverlay />
    </View>
);

export default function Welcome() {
    const router = useRouter();

    return (
        <PageView paddingTop={0} paddingBottom={0} statusBarStyle="light">
            <View flex={1} backgroundColor="$background">
                <HeroImage />
                <View flex={0.4} alignItems="center" padding="$4">
                    <Image
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Coat_of_arms_of_the_Democratic_Republic_of_the_Congo_%28with_background%29.svg/1026px-Coat_of_arms_of_the_Democratic_Republic_of_the_Congo_%28with_background%29.svg.png' }}
                        width={80}
                        height={80}
                        objectFit="contain"
                        marginBottom="$2"
                    />
                    <YStack width="100%" alignItems="center" justifyContent="center" padding="$4">
                        <H3 fontSize="$6" fontWeight="bold">
                            Welcome to CongoNews
                        </H3>

                        <YStack gap="$2" width="100%" marginTop="$4">
                            <Button onPress={() => router.push("/(unauthed)/signin")} theme="accent" color="white" fontWeight="bold">
                                Se connecter
                            </Button>
                            <Button onPress={() => router.push("/(unauthed)/signup")} theme="gray" borderWidth={1} borderColor="$gray6" fontWeight="bold">
                                Ouvrir un compte
                            </Button>
                        </YStack>

                        <Paragraph textAlign="center" fontSize="$1" lineHeight="$1" color="$gray10" marginTop="$6" paddingHorizontal="$4">
                            En continuant, vous acceptez les conditions d'utilisation de CongoNews et reconnaissez avoir lu notre politique de confidentialité.
                        </Paragraph>
                    </YStack>
                </View>
            </View>
        </PageView>
    );
}
