import {ArrowLeft} from "@tamagui/lucide-icons";
import {Button, ButtonProps} from "tamagui";

type AppBackButtonProps = {
    onPress: () => void;
}

export default function AppBackButton(props: AppBackButtonProps & ButtonProps) {
    const {onPress, ...rest} = props;

    return (
        <Button
            chromeless
            alignSelf="flex-start"
            size="$4"
            width="$4"
            height="$4"
            borderRadius="$12"
            backgroundColor="$gray6"
            icon={<ArrowLeft size="$1" />}
            onPress={onPress}
            {...rest}
        />
    );
}
