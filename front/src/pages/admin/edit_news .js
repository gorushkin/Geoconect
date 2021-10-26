import { Col, Row } from 'react-bootstrap';

import { createNewsRequest } from '../../api';
import Editor from '../../components/Admin/Editor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const EditNews = () => {
  const onSubmit = async ({ title, body }) => {
    try {
      const { data: news } = await createNewsRequest({ title, body });
    } catch (error) {
      console.log(error);
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

export default EditNews;
