import React from "react";

import Caption from "@/ui/components/typography/Caption";

type ArticleCategoryPillProps = {
    category: string;
};

export default function ArticleCategoryPill(props: ArticleCategoryPillProps) {
    const { category } = props;

    return <Caption>{category}</Caption>;
}
