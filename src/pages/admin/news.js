import { useSelector } from 'react-redux';
import { useClient } from '../../hooks';
import Layout from '../../components/Admin/Layout';
import { Container, Row } from 'react-bootstrap';

const News = () => {
  const isClient = useClient();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return isClient ? (
    <Layout>
      <Container>
        <Row className='justify-content-center pt-3'>
          <h1 lg={8}>AllNews</h1>
        </Row>
        <Row className='justify-content-center'></Row>
      </Container>
    </Layout>
  ) : null;
};

export default News;
