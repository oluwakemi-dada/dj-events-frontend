import {} from '../types'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

// Register user
export const register = (user) => async (dispatch) => {
  console.log(user);
};

// Login user
export const login =
  ({ email: identifier, password }) =>
  async (dispatch) => {
    console.log({ identifier, password });
  };

// Logout user
export const logout = () => async (dispatch) => {
  console.log('Logout');
};

// Check if user is logged in
export const checkUserLoggedIn = (user) => async (dispatch) => {
  console.log('Check');
};
