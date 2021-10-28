import Layout from '../../components/Admin/Layout';
import LoginForm from '../../components/Admin/LoginForm';
import { useClient } from '../../hooks';

const Admin = () => {
  const isClient = useClient();

  return isClient ? (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  ) : null;
};

export default Admin;
