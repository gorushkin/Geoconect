import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { getNewsRequest, updateNewsRequest } from '../../api';
import { routes } from '../../api';
import Editor from '../../components/Admin/Editor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const EditNews = () => {
  const [news, setNews] = useState();
  const router = useRouter();

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const getNews = async () => {
      const news = await getNewsRequest(id);
      if (news) {
        setNews(news);
      }
    };
    if (id) getNews();
  }, [id]);

  const onSubmit = async ({ title, body }) => {
    const data = await updateNewsRequest(id, { title, body });
    if (data) {
      router.push(routes.NEWS);
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
