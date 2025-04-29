import type React from "react";

import {Paragraph, ParagraphProps} from "tamagui";

export default function Caption(props: React.PropsWithChildren<ParagraphProps>) {
    const {
        marginTop = "$6",
        paddingHorizontal = "$4",
        children,
        ...rest
    } = props;

    return (
        <Paragraph
            fontSize="$1"
            lineHeight="$1"
            color="$gray10"
            marginTop={marginTop}
            paddingHorizontal={paddingHorizontal}
            {...rest}
        >
            {children}
        </Paragraph>
    );
}
