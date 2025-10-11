export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        username: string;
        email: string;
    };
}