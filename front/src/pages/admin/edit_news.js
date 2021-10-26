import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { createNewsRequest, getNewsRequest } from '../../api';
import Editor from '../../components/Admin/Editor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const EditNews = () => {
  const [news, setNews] = useState();

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const getNews = async () => {
      const { data } = await getNewsRequest(id);
      setNews(data);
    };
    if (id) getNews();
  }, [id]);

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
          <Editor data={news} onSubmit={onSubmit} edit />
        </Col>
      </Row>
    </Layout>
  );
};

export default EditNews;
