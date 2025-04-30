export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
};

export type RefreshTokenRequest = {
    refresh_token: string;
}

export type RefreshTokenResponse = {
    token: string;
}

export type ClientDetailErrorResponse = {
    type: string;
    title: string;
    detail: string;
    status: number;
}

export type ClientErrorResponse = {
    status: string;
    message: string;
}
