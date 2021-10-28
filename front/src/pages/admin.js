import { useSelector } from 'react-redux';

import CMS from '../components/Admin/CMS';
import Layout from '../components/Admin/Layout';
import LoginForm from '../components/Admin/LoginForm';
import { useClient } from '../hooks';

const Admin = () => {
  const isClient = useClient();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  const title = isAuthorized ? 'CMS' : 'Login';

  return isClient ? <Layout title={title}>{isAuthorized ? <CMS /> : <LoginForm />}</Layout> : null;
};

export default Admin;
