import {} from '../types';

const initialState = {
  loading: true,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default auth;