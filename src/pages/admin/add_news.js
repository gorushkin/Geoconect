import Layout from '../../components/Admin/Layout';
import { Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

import Editor from 'rich-markdown-editor';

const AddNews = () => {
  const [content, setContent] = useState('Hello world!');

  const onSaveHandler = () => {
    console.log('onSaveHandler');
    console.log(content);
  };

  return (
    <Layout>
      <Row>
        <Col>
          <div className='editor__wrapper'>
            <Editor onChange={setContent} />
          </div>
          <Button onClick={onSaveHandler} variant='primary' type='submit'>
            Save
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default AddNews;
