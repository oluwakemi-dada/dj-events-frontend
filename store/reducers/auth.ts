import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CHECK_USER_LOGGED_IN,
  CLEAR_USER,
  SET_ERROR,
  CLEAR_ERROR,
} from '../types';

import { AuthReducerAction } from '../../types';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const auth = (state = initialState, action: AuthReducerAction) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER:
    case REGISTER_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    case CHECK_USER_LOGGED_IN:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default auth;
