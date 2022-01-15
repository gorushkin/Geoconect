import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { getNewsRequest, updateNewsRequest } from '../../api';
import Layout from '../../components/Admin/Layout';
import Editor from '../../components/Admin/NewsEditor';
import 'react-markdown-editor-lite/lib/index.css';

const EditNews = () => {
  const [news, setNews] = useState();

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const getNews = async () => {
      const { data: news } = await getNewsRequest(id);
      if (news) {
        setNews(news);
      }
    };
    if (id) getNews();
  }, [id]);

  const onSubmit = (values) => updateNewsRequest(id, values);

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
