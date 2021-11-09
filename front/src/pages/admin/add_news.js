import { Col, Row } from 'react-bootstrap';

import { createNewsRequest } from '../../api';
import Editor from '../../components/Admin/Editor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const AddNews = () => {
  const onSubmit = (data) => createNewsRequest(data);

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
