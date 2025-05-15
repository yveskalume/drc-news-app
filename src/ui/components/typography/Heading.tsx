import type React from "react";

import { H4, ParagraphProps } from "tamagui";

export default function Heading(props: React.PropsWithChildren<ParagraphProps>) {
    const { children, ...rest } = props;

    return (
        <H4 fontWeight="bold" alignSelf="flex-start" {...rest}>
            {children}
        </H4>
    );
}
