import {Image} from "tamagui";

type AppLogoProps = {
    width?: number
    height?: number
}

export default function AppLogo(props: AppLogoProps) {
    const { width = 80, height = 80 } = props

    return (
        <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Coat_of_arms_of_the_Democratic_Republic_of_the_Congo_%28with_background%29.svg/1026px-Coat_of_arms_of_the_Democratic_Republic_of_the_Congo_%28with_background%29.svg.png' }}
            width={height}
            height={width}
            objectFit="contain"
            marginBottom="$2"
        />
    )
}
