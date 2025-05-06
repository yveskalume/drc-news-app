import type React from "react";

import {H3, ParagraphProps} from "tamagui";

export default function Heading(props: React.PropsWithChildren<ParagraphProps>) {
    const {
        children,
        ...rest
    } = props;

    return (
        <H3 fontWeight="bold" alignSelf="flex-start" {...rest}>
            {children}
        </H3>
    );
}
