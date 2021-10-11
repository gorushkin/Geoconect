import '../styles/globals.css';
import '../styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '../slices';
import { actions } from '../slices/user';
import { useEffect } from 'react';

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    store.dispatch(actions.userInit());
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
