export type ClientDetailErrorResponse = {
    type: string;
    title: string;
    detail: string;
    status: number;
}

export type ClientErrorResponse = {
    code: string;
    message: string;
}

export type Login = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refresh_token: string;
};

export type Register = {
    name: string;
    email: string;
    password: string;
}

export type RefreshToken = {
    refresh_token: string;
}

export type RefreshTokenResponse = {
    token: string;
}

export type PasswordForgotten = {
    email: string;
}

export type Article = {
    id: string;
    title: string;
    link: string;
    categories: Array<string>;
    body: string;
    source: string;
    hash: string;
    credibility: {
        bias: "neutral" | "slightly" | "partisan" | "extreme";
        reliability: "trusted" | "reliable" | "average" | "unreliable" | "low_trust";
        transparency: "low" | "medium" | "high";
    };
    sentiment: "negative" | "positive" | "neutral";
    metadata?: {
        title?: string;
        description?: string;
        image?: string;
        video?: string;
        audio?: string;
        locale?: string;
    };
    publishedAt: string;
    crawledAt: string;
    updatedAt: string;
};

export type SourceOverview = {
    articles: number;
    source: string;
    url: string;
    crawledAt: string;
    updatedAt?: string;
}

export type SourceStatisticsDetails = {
    source: string
    publicationsGraph: Array<{
        date: string;
        count: number;
    }>
    categoriesShares: Array<{
        name: string;
        count: number;
        percentage: number
    }>
    categories: number;
    articles: number;
    crawledAt: string;
    updatedAt?: string;
}

export type SourcesStatisticsOverview = {
    items: Array<SourceOverview>
}

export type GetArticleListQuery = {
    dateRange?: {
        start: number;
        end: number;
    }
    page?: number;
    limit?: number;
    source?: string;
    search?: string;
}

export type ArticleList = {
    items: Array<Article>;
    pagination: {
        currentPage: number;
        totalItems: number;
        itemsPerPage: number;
        totalPages: number;
    }
}
