import {} from '../types';

const initialState = {
  user: null,
  error: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default auth;
