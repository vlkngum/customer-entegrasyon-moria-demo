export interface SignUpRequest {
    email_or_phone: string;
    password: string;
}

export interface SignInRequest {
    email_or_phone: string;
    password: string;
}
