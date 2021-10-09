import '../styles/globals.css';
import '../styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from '../slices';

const MyApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)

export default MyApp;
