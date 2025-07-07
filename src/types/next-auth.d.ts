// import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      phone: string;
      authority: string;
      avatar: string;
      two_factor_enabled: boolean;
    };
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }

  interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    email?: string;
    name?: string;
    authority: string;
    phone: string;
    avatar: string;
    two_factor_enabled: boolean;
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }
} 