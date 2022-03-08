export interface ChangePassword {
    password: string;
    confirmPassword: string;
    resetPasswordKey: string;
}

export interface LoginResponse {
    code: string;
    data: string;
    message: string;
}

export interface RegisterResponse {
    id: number;
    rememberToken: string;
    authId: string;
}

export interface ForgotPasswordResponse {
    phoneNumber?: string;
}

export interface OtpForgotPasswordResponse {
    token: string;
    valid: boolean;
}