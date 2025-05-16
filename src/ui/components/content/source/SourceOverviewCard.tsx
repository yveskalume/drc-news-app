import type React from "react";

import { GetProps, Paragraph, styled, XStack, YStack } from "tamagui";

import { SourceOverview } from "@/api/aggregator/source";
import FollowToggleButton from "@/ui/components/content/source/FollowToggleButton";
import SourceAvatar from "@/ui/components/content/source/SourceAvatar";

const SourceCardFrame = styled(YStack, {
    alignItems: "center",
    gap: "$2",
    borderRadius: "$4",

    variants: {
        horizontal: {
            true: {
                maxWidth: 100,
                flexShrink: 0,
            },
            false: {
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                gap: "$4",
                paddingVertical: "$2",
            },
        },
    },
} as const);

type SourceCardProps = GetProps<typeof SourceCardFrame> & {
    data: SourceOverview;
    horizontal?: boolean;
};

export function SourceOverviewCard(props: SourceCardProps) {
    const { data, horizontal = true, ...rest } = props;

    const nameFontSize = horizontal ? "$3" : "$4";

    return (
        <SourceCardFrame horizontal={horizontal} {...rest}>
            <SourceAvatar source={data.source} size={horizontal ? 65 : 50} />

            {horizontal ? (
                <Paragraph
                    fontSize={nameFontSize}
                    fontWeight="bold"
                    numberOfLines={1}
                    textAlign="center"
                    maxWidth="100%"
                >
                    {data.source}
                </Paragraph>
            ) : (
                <YStack flex={1} gap="$1">
                    <XStack alignItems="center" gap="$1">
                        <Paragraph fontSize={nameFontSize} fontWeight="bold" numberOfLines={1}>
                            {data.source}
                        </Paragraph>
                    </XStack>

                    <Paragraph color="$accent6" fontSize="$3" numberOfLines={1}>
                        {data.url}
                    </Paragraph>
                </YStack>
            )}

            <FollowToggleButton source={data.source} followed={data.followed} />
        </SourceCardFrame>
    );
}
