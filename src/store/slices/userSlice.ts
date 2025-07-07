import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/utils/requests/authService';
import { SignInRequest, SignUpRequest } from '@/types/Auth';
import { AuthData, User } from '@/types/User';
import { IResponse } from '@/types/IResponse';

// Async thunks
export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials: SignInRequest): Promise<IResponse<AuthData>> => {
    const response = await authService.signIn(credentials);
    return response;
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userData: SignUpRequest): Promise<IResponse<AuthData>> => {
    const response = await authService.signUp(userData);
    return response;
  }
);

// User state interface
interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tokenType: null,
  expiresIn: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenType = null;
      state.expiresIn = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setTokens: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: number;
    }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenType = action.payload.tokenType;
      state.expiresIn = action.payload.expiresIn;
    },
    clearUser: (state) => {
      // Reset all user state to initial values
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // Sign In
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.tokenType = action.payload.data.token_type;
        state.expiresIn = action.payload.data.expires_in;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
        state.isAuthenticated = false;
      });

    // Sign Up
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
        state.tokenType = action.payload.data.token_type;
        state.expiresIn = action.payload.data.expires_in;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, logout, setUser, setTokens, clearUser } = userSlice.actions;
export default userSlice.reducer; 