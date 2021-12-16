import { Col, Row } from 'react-bootstrap';

import { createNewsRequest } from '../../api';
import Layout from '../../components/Admin/Layout';
import Editor from '../../components/Admin/NewsEditor';
import 'react-markdown-editor-lite/lib/index.css';

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
