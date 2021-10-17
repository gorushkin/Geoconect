import '../styles/globals.css';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
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
