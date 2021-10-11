import { useSelector } from 'react-redux';
import { useClient } from '../../hooks';
import Layout from '../../components/Admin/Layout';
import CMS from '../../components/Admin/CMS';
import LoginForm from '../../components/Admin/LoginForm';

const Admin = () => {
  const isClient = useClient();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return isClient ? <Layout>{isAuthorized ? <CMS /> : <LoginForm />}</Layout> : null;
};

export default Admin;
