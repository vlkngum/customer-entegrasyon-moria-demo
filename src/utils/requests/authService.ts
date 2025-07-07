import { IResponse } from "@/types/IResponse";
import { SignInRequest, SignUpRequest } from "@/types/Auth";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
  };
}

export const authService = {
    signUp: async (data: SignUpRequest): Promise<IResponse<AuthResponse>> => {
        const response = await fetch('https://apiprodv2.entekas.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': 'x'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    },
    signIn: async (data: SignInRequest): Promise<IResponse<AuthResponse>> => {
        const response = await fetch('https://apiprodv2.entekas.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bearer': 'x'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },
};
