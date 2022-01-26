import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from 'store';
import { checkUserLoggedIn } from '../store/actions/auth';
import { AppDispatch } from 'store';
import { useDispatch } from 'react-redux';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(checkUserLoggedIn());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
