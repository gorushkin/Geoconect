import Layout from '../../components/Admin/Layout';
import { Container, Row } from 'react-bootstrap';
import { useClient } from '../../hooks';
import { useEffect, useState } from 'react';

import Editor from '../../components/Admin/Editor';

const AddNews = () => {
  const isClient = useClient();

  const [data, setData] = useState('');

  const [text, setText] = useState('<p>Hello from CKEditor 5!</p>');
  return (
    <Layout>
      <div className='App'>
        <h1>ckEditor 5</h1>

        <Editor
          name='description'
          value={text}
          onChange={(text) => {
            setText(text);
          }}
          editorLoaded={isClient}
        />

        {JSON.stringify(text)}
      </div>
    </Layout>
  );
};

export default AddNews;
