import Layout from '../../../components/Admin/Layout';
import { useClient } from '../../../hooks';

const News = ({number}) => {
  const isClient = useClient();

  return isClient ? (
    <Layout>
      <h1>asdfasfsdfsfd</h1>
      <p>{number}</p>
    </Layout>
  ) : null;
};

export default News;

export async function getServerSideProps(context) {
  console.log('context: ', context.headers);
  console.log('context: ', context.params.id);
  const { id } = context.params;
  return {
    props: {
      number: id,
    }, // will be passed to the page component as props
  };
}
