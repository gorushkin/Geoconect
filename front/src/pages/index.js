import { getAllNewsRequestSSR } from '../api';
import Layout from '../components/Layout';
import Main from '../components/Main';

const Home = ({ news }) => (
  <Layout>
    <Main news={news} />
  </Layout>
);

export const getStaticProps = async (context) => {
  try {
    const { data } = await getAllNewsRequestSSR(true);
    return {
      props: { news: data },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
