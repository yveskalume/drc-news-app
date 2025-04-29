import type React from "react";

import {Paragraph, ParagraphProps} from "tamagui";

export default function Caption(props: React.PropsWithChildren<ParagraphProps>) {
    const {
        paddingHorizontal = "$4",
        children,
        ...rest
    } = props;

    return (
        <Paragraph
            fontSize="$1"
            lineHeight="$1"
            color="$gray10"
            paddingHorizontal={paddingHorizontal}
            {...rest}
        >
            {children}
        </Paragraph>
    );
}
