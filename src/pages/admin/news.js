import { useSelector } from 'react-redux';
import { useClient } from '../../hooks';
import Layout from '../../components/Admin/Layout';

const News = () => {
  const isClient = useClient();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return isClient ? (
    <Layout>
      <h1>All news</h1>
    </Layout>
  ) : null;
};

export default News;
