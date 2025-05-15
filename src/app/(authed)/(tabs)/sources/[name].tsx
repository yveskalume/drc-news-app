import { useLocalSearchParams } from "expo-router";
import { Paragraph } from "tamagui";

import ScreenView from "@/ui/components/layout/ScreenView";
import Heading from "@/ui/components/typography/Heading";

export default function SourceDetails() {
    const { name } = useLocalSearchParams();

    return (
        <ScreenView>
            <Heading>Source Details</Heading>
            <Paragraph>{name}</Paragraph>
        </ScreenView>
    );
}
