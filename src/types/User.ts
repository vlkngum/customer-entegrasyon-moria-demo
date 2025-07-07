import { IResponse } from './IResponse';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    authority: string;
    two_factor_enabled: boolean;
}

export interface AuthData {
    user: User;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

export type LoginResponse = IResponse<AuthData>;

// User roles and permissions
export type UserAuthority = 'customer' | 'admin' | 'manager' | 'support';

export interface UserPermissions {
    roles: string[];
    permissions: string[];
}

// Extended user interface with additional properties
export interface ExtendedUser extends User {
    roles?: string[];
    permissions?: string[];
    company?: string;
    isActive?: boolean;
    lastLogin?: string;
    createdAt?: string;
    updatedAt?: string;
}
