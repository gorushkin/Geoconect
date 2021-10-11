import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices';
import LoginPage from '../components/Pages/LoginPage';
import CMSPage from '../components/Pages/CMSPage';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Admin = () => {
  const dispatch = useDispatch();
  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(actions.userInit(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isAuthorized ? <CMSPage /> : <LoginPage />}</>;
};

export default Admin;
