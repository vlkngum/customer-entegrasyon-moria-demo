import { RootState } from "../index";

// Basic selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectRefreshToken = (state: RootState) => state.user.refreshToken;
export const selectTokenType = (state: RootState) => state.user.tokenType;
export const selectExpiresIn = (state: RootState) => state.user.expiresIn;
export const selectLoading = (state: RootState) => state.user.loading;
export const selectError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

// Computed selectors
export const selectUserAuthority = (state: RootState) => state.user.user?.authority;
export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUserEmail = (state: RootState) => state.user.user?.email;
export const selectUserPhone = (state: RootState) => state.user.user?.phone;
export const selectUserAvatar = (state: RootState) => state.user.user?.avatar;
export const selectTwoFactorEnabled = (state: RootState) => state.user.user?.two_factor_enabled;

// Auth state selector
export const selectAuthState = (state: RootState) => ({
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
  error: state.user.error,
});

// Token state selector
export const selectTokenState = (state: RootState) => ({
  accessToken: state.user.accessToken,
  refreshToken: state.user.refreshToken,
  tokenType: state.user.tokenType,
  expiresIn: state.user.expiresIn,
}); 