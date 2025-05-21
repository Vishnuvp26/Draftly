export interface IUserService {
    register(name: string, email: string, password: string): Promise<{ message: string }>;
    login(email: string, password: string): Promise<{
        message: string;
        user: any;
        accessToken: string;
        refreshToken: string;
    }>
    refreshAccessToken(token: string): Promise<string>;
};