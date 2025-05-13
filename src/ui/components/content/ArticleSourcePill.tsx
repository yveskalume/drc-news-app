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
                    source={{uri: 'https://i0.wp.com/beto.cd/wp-content/uploads/2023/12/betofav2.png?fit=192%2C192&ssl=1'}}
                />
                <Avatar.Fallback backgroundColor="$accent6"/>
            </Avatar>
            <Paragraph size="$2" fontWeight="bold">
                {source}
            </Paragraph>
        </XStack>
    );
}
