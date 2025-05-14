import Caption from "@/ui/components/typography/Caption";
import React from "react";

type ArticleCategoryPillProps = {
    category: string;
}

export default function ArticleCategoryPill(props: ArticleCategoryPillProps) {
    const {category} = props;

    return <Caption>{category}</Caption>
}
