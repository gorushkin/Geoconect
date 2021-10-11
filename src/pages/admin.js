import { useSelector } from 'react-redux';
import LoginPage from '../components/Pages/LoginPage'
import CMSPage from '../components/Pages/CMSPage'

const Admin = () => {
  const { user: { isAuthorized } } = useSelector(state => state);

  return (
    <>
      {isAuthorized ? <CMSPage /> : <LoginPage />}
    </>
  );
};

export default Admin;
