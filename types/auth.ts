export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export type LoginUser = (user: LoginUserData) => void;

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthState {
  user: User;
  error: any;
  isAuthenticated: boolean;
}

export enum AuthActionTypes {
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  CHECK_USER_LOGGED_IN = 'CHECK_USER_LOGGED_IN',
  CLEAR_USER = 'CLEAR_USER',
  SET_AUTH_ERROR = 'SET_AUTH_ERROR',
  CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR',
}

export interface RegisterUserAction {
  type: AuthActionTypes.REGISTER_USER;
  payload: {
    user: User;
  };
}

export interface LoginUserAction {
  type: AuthActionTypes.LOGIN_USER;
  payload: {
    user: User;
  };
}

export interface LogoutUserAction {
  type: AuthActionTypes.LOGOUT_USER;
}

export interface CheckUserLoggedInAction {
  type: AuthActionTypes.CHECK_USER_LOGGED_IN;
  payload: {
    user: User;
  };
}

export interface ClearUserAction {
  type: AuthActionTypes.CLEAR_USER;
}

export interface SetAuthErrorAction {
  type: AuthActionTypes.SET_AUTH_ERROR;
  payload: any;
}

export interface ClearAuthErrorAction {
  type: AuthActionTypes.CLEAR_AUTH_ERROR;
}

export type AuthAction =
  | RegisterUserAction
  | LoginUserAction
  | LogoutUserAction
  | CheckUserLoggedInAction
  | ClearUserAction
  | SetAuthErrorAction
  | ClearAuthErrorAction;
