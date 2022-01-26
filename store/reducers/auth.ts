import { AuthActionTypes, AuthAction, AuthState } from '../../types/index';

const initialState: AuthState = {
  user: null!,
  isAuthenticated: false,
  error: null,
};

const authReducers = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER:
    case AuthActionTypes.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case AuthActionTypes.CHECK_USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case AuthActionTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case AuthActionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case AuthActionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducers;
