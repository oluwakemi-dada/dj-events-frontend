import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CHECK_USER_LOGGED_IN,
  CLEAR_USER,
  SET_ERROR,
  CLEAR_ERROR,
} from '../types';
import { NEXT_URL } from '@/config/index';
import { RegisterUserData, LoginUserData, DispatchType } from '../../types';

// Register user
export const register =
  (user: RegisterUserData) => async (dispatch: DispatchType) => {
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
        type: REGISTER_USER,
        payload: data.user,
      });
    } else {
      dispatch({
        type: SET_ERROR,
        payload: data.message,
      });
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  };

// Login user
export const login =
  ({ email: identifier, password }: LoginUserData) =>
  async (dispatch: DispatchType) => {
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
    console.log(data);

    if (res.ok) {
      dispatch({
        type: LOGIN_USER,
        payload: data.user,
      });
    } else {
      dispatch({
        type: SET_ERROR,
        payload: data.message,
      });
      dispatch({
        type: CLEAR_ERROR,
      });
    }
  };

// Logout user
export const logout = () => async (dispatch: DispatchType) => {
  const res = await fetch(`${NEXT_URL}/api/logout`, {
    method: 'POST',
  });

  if (res.ok) {
    dispatch({
      type: LOGOUT_USER,
    });
  }
};

// Check if user is logged in
export const checkUserLoggedIn = () => async (dispatch: DispatchType) => {
  const res = await fetch(`${NEXT_URL}/api/user`);
  const data = await res.json();

  if (res.ok) {
    dispatch({
      type: CHECK_USER_LOGGED_IN,
      payload: data.user,
    });
  } else {
    dispatch({
      type: CLEAR_USER,
    });
  }
};
