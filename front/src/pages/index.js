import { getAllNewsRequest } from '../api';
import Layout from '../components/Layout';
import Main from '../components/Main';

const Home = ({ posts }) => (
  <Layout>
    <Main posts={posts} />
  </Layout>
);

export const getStaticProps = async (context) => {
  // const {
  //   data: {
  //     posts: { posts },
  //   },
  // } = await getAllNewsRequest();

  const data = await getAllNewsRequest();
  console.log('data: ', data);
  const posts = [];
  return {
    props: { posts },
  };
};

export default Home;
