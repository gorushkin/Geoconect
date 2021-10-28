import { getAllNewsRequest } from '../api';
import Layout from '../components/Layout';
import Main from '../components/Main';

const Home = ({ news }) => (
  <Layout>
    <Main news={news} />
  </Layout>
);

export const getStaticProps = async (context) => {
  try {
    const { data } = await getAllNewsRequest();
    return {
      props: { news: data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
