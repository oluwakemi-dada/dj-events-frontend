import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from 'store/store';
import { checkUserLoggedIn } from '../store/actions/auth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    store.dispatch(checkUserLoggedIn());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
