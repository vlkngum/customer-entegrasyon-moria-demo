import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../index';
import { signIn, signUp, logout, clearError, setUser, setTokens } from '../slices/userSlice';
import * as userSelectors from '../selectors/userSelectors';
import { SignInRequest, SignUpRequest } from '@/types/Auth';
import { User } from '@/types/User';

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const user = useSelector(userSelectors.selectUser);
  const accessToken = useSelector(userSelectors.selectAccessToken);
  const refreshToken = useSelector(userSelectors.selectRefreshToken);
  const tokenType = useSelector(userSelectors.selectTokenType);
  const expiresIn = useSelector(userSelectors.selectExpiresIn);
  const loading = useSelector(userSelectors.selectLoading);
  const error = useSelector(userSelectors.selectError);
  const isAuthenticated = useSelector(userSelectors.selectIsAuthenticated);

  // Computed selectors
  const userAuthority = useSelector(userSelectors.selectUserAuthority);
  const userName = useSelector(userSelectors.selectUserName);
  const userEmail = useSelector(userSelectors.selectUserEmail);
  const userPhone = useSelector(userSelectors.selectUserPhone);
  const userAvatar = useSelector(userSelectors.selectUserAvatar);
  const twoFactorEnabled = useSelector(userSelectors.selectTwoFactorEnabled);

  // Actions
  const login = (credentials: SignInRequest) => {
    return dispatch(signIn(credentials));
  };

  const register = (userData: SignUpRequest) => {
    return dispatch(signUp(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const clearUserError = () => {
    dispatch(clearError());
  };

  const updateUser = (userData: User) => {
    dispatch(setUser(userData));
  };

  const updateTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }) => {
    dispatch(setTokens(tokens));
  };

  return {
    // State
    user,
    accessToken,
    refreshToken,
    tokenType,
    expiresIn,
    loading,
    error,
    isAuthenticated,
    
    // Computed state
    userAuthority,
    userName,
    userEmail,
    userPhone,
    userAvatar,
    twoFactorEnabled,
    
    // Actions
    login,
    register,
    logout: logoutUser,
    clearError: clearUserError,
    updateUser,
    updateTokens,
  };
}; 