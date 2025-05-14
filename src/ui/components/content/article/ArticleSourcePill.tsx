import {Avatar, Paragraph, XStack, XStackProps} from "tamagui";
import React from "react";

type ArticleSourcePillProps = XStackProps & {
    source: string;
}

export default function ArticleSourcePill(props: ArticleSourcePillProps) {
    const {source, ...rest} = props;

    return (
        <XStack alignItems="center" gap="$2" justifyContent="flex-start" {...rest}>
            <Avatar circular size="$1">
                <Avatar.Image
                    accessibilityLabel={source}
                    source={{uri: `https://devscast.org/images/source/${source}.png`, cache: 'force-cache'}}
                />
                <Avatar.Fallback backgroundColor="$gray10"/>
            </Avatar>
            <Paragraph size="$2" fontWeight="bold">
                {source}
            </Paragraph>
        </XStack>
    );
}
