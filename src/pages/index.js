import Main from '../components/Main';
import Layout from '../components/Layout';
import { postRequest } from '../api';

const Home = ({ posts }) => (
  <Layout>
    <Main posts={posts} />
  </Layout>
);

export const getStaticProps = async (context) => {
  const {
    data: {
      posts: { posts },
    },
  } = await postRequest('posts');
  return {
    props: {posts},
  };
};

export default Home;
