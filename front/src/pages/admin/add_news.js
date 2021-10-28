import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

import { createNewsRequest } from '../../api';
import { routes } from '../../api';
import Editor from '../../components/Admin/Editor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const AddNews = () => {
  const router = useRouter();

  const onSubmit = async ({ title, body }) => {
    const { data } = await createNewsRequest({ title, body });
    if (data) {
      router.push(routes.NEWS);
    }
  };

  return (
    <Layout closed>
      <Row>
        <Col>
          <Editor onSubmit={onSubmit} />
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNews;
