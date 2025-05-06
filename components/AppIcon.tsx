import {Image} from "tamagui";

type AppLogoProps = {
    width?: number
    height?: number
}

export default function AppIcon(props: AppLogoProps) {
    const { width = 80, height = 80 } = props

    return (
        <Image
            source={require('@/assets/images/logo.png')}
            width={height}
            height={width}
            objectFit="contain"
            marginBottom="$2"
        />
    )
}
