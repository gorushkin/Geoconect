import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import Editor from 'rich-markdown-editor';

import Layout from '../../components/Admin/Layout';

const AddNews = () => {
  const [content, setContent] = useState('');

  const onSaveHandler = () => {
    console.log('content: ', content);
  };

  return (
    <Layout closed>
      <Row>
        <Col>
          <div className="editor__wrapper">
            <Editor onChange={setContent} />
          </div>
          <Button onClick={onSaveHandler} variant="primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="news__content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNews;