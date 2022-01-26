import {
  AuthActionTypes,
  RegisterUserData,
  LoginUserData,
  User
} from '../../types/index';
import { NEXT_URL } from '@/config/index';
import { AppThunk } from 'store';

// Register user
export const register =
  (user: RegisterUserData): AppThunk =>
  async (dispatch) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({
        type: AuthActionTypes.REGISTER_USER,
        payload: data.user,
      });
    } else {
      dispatch({
        type: AuthActionTypes.SET_AUTH_ERROR,
        payload: data.message,
      });
      dispatch({
        type: AuthActionTypes.CLEAR_AUTH_ERROR,
      });
    }
  };

// Login user
export const login =
  ({ email: identifier, password }: LoginUserData): AppThunk =>
  async (dispatch) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch({
        type: AuthActionTypes.LOGIN_USER,
        payload: data.user,
      });
    } else {
      dispatch({
        type: AuthActionTypes.SET_AUTH_ERROR,
        payload: data.message,
      });
      dispatch({
        type: AuthActionTypes.CLEAR_AUTH_ERROR,
      });
    }
  };

// Logout user
export const logout = (): AppThunk => async (dispatch) => {
  const res = await fetch(`${NEXT_URL}/api/logout`, {
    method: 'POST',
  });

  if (res.ok) {
    dispatch({
      type: AuthActionTypes.LOGOUT_USER,
    });
  }
};

// Check if user is logged in
export const checkUserLoggedIn = (): AppThunk => async (dispatch) => {
  const res = await fetch(`${NEXT_URL}/api/user`);
  const data = await res.json();

  if (res.ok) {
    dispatch({
      type: AuthActionTypes.CHECK_USER_LOGGED_IN,
      payload: data.user,
    });
  } else {
    dispatch({
      type: AuthActionTypes.CLEAR_USER,
    });
  }
};
