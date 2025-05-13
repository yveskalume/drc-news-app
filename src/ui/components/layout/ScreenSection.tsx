import type React from 'react';
import {GetProps, Paragraph, styled, XStack} from 'tamagui';
import {ArrowRight} from "@tamagui/lucide-icons";
import {Href, Link} from "expo-router";

const SectionContainer = styled(XStack, {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: '$2',
});

type ScreenSectionProps = GetProps<typeof SectionContainer> & {
    title: string;
    forwardLink?: Href
}

type ScreenSectionLinkProps = {
    href: Href;
}

const ScreenSectionLink = ({href}: ScreenSectionLinkProps) => (
    <Link href={href} push asChild>
        <XStack gap="2" alignItems="center">
            <Paragraph color="$accent5" fontWeight={500}>Voir tout</Paragraph>
            <ArrowRight color="$accent5"/>
        </XStack>
    </Link>
)

export default function ScreenSection(props: ScreenSectionProps) {
    const {
        title,
        forwardLink,
        ...rest
    } = props;

    return (
        <SectionContainer {...rest}>
            <Paragraph
                fontSize="$6"
                fontWeight="bold"
                color="$color"
                numberOfLines={1}
                flexShrink={1}
                marginRight="$2"
            >
                {title}
            </Paragraph>
            {forwardLink && <ScreenSectionLink href={forwardLink}/>}
        </SectionContainer>
    );
}
