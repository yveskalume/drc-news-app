import React from "react";

import { Avatar, GetProps, Paragraph, XStack } from "tamagui";

type ArticleSourcePillProps = GetProps<typeof XStack> & {
    source: string;
};

export default function ArticleSourcePill(props: ArticleSourcePillProps) {
    const { source, ...rest } = props;

    return (
        <XStack alignItems="center" gap="$2" justifyContent="flex-start" {...rest}>
            <Avatar circular size="$1">
                <Avatar.Image
                    accessibilityLabel={source}
                    objectFit="contain"
                    backgroundColor="white"
                    source={{ uri: `https://devscast.org/images/sources/${source}.png`, cache: "force-cache" }}
                />
                <Avatar.Fallback backgroundColor="$gray10" />
            </Avatar>
            <Paragraph size="$2" fontWeight="bold">
                {source}
            </Paragraph>
        </XStack>
    );
}
