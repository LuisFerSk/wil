export interface VerifyTokenResponse {
    id: number;
    username: string;
    role: string;
    iat: number;
    exp: number;
}
