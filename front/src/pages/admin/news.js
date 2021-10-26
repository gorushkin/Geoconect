import { useEffect, useState } from 'react';
import { Container, Row, ListGroup, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getNewsRequest } from '../../api';
import Layout from '../../components/Admin/Layout';

const NewsItem = ({ item }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <p>{item.title || 'Нет заголовка'}</p>
      <div>
        <Badge className="bg-success" variant="success" bg="success">
          Edit
        </Badge>{' '}
        <Badge className="bg-danger" variant="danger" bg="danger">
          Delete
        </Badge>
      </div>
    </ListGroup.Item>
  );
};

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const { data } = await getNewsRequest();
      setNews(data);
    };
    getNews();
  }, []);

  useEffect(() => {
    console.log('news: ', news);
  }, [news]);

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  return (
    <Layout closed>
      <Container>
        <Row className="justify-content-center pt-3">
          <h1 lg={8}>AllNews</h1>
        </Row>
        <Row className="justify-content-center">
          <ListGroup>
            {news.map((item) => {
              console.log('item: ', item);
              return <NewsItem key={item.id} item={item} />;
            })}
          </ListGroup>
        </Row>
      </Container>
    </Layout>
  );
};

export default News;
