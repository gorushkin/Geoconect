import CMS from '../../components/Admin/CMS';
import Layout from '../../components/Admin/Layout';
import SignUp from '../../components/Admin/SignUp';

const Admin = () => {
  return (
    <Layout closed title="Add user">
      <SignUp />
    </Layout>
  );
};

export default Admin;
