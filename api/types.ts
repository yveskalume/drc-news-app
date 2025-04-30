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

export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refresh_token: string;
};

export type RegisterRequest = {
    name: string,
    email: string,
    password: string
}

export type RefreshTokenRequest = {
    refresh_token: string;
}

export type RefreshTokenResponse = {
    token: string;
}

export type PasswordForgottenRequest = {
    email: string
}

export type Article = {
    id: string // 01967ea2-e9f9-75e2-af9a-6fe3462d9814
    title: string
    link: URL
    categories: string
    body: string
    source: string // actualite.cd
    hash: string // 764d50bc897567d2bc1baf8d66b1b286
    publishedAt: string // 2025-04-28T16:28:00+00:00
    crawledAt: string // 2025-04-28T16:28:00+00:00
}

export type ListArticlesRequest = {
    dateRange?: {
        start: number
        end: number
    }
    page?: number
    limit?: number
    source?: string
    search?: string
}

export type ListArticlesResponse = {
    items: Article[]
    pagination: {
        currentPage: number
        totalItems: number
        itemsPerPage: number
        totalPages: number
    }
}
