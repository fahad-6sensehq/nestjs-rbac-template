export interface IUserSession {
    userId: string;
    tokenId: string;
    accessToken: string;
    refreshToken: string;
    userAgent?: string;
    ipAddress?: string;
    deviceType?: string;
    os?: string;
    browser?: string;
    expiresAt: Date;
    isRevoked: boolean;
}
