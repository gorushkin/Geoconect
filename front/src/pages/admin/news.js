import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, ListGroup, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { getAllNewsRequest } from '../../api';
import { routes } from '../../api';
import Layout from '../../components/Admin/Layout';

const NewsItem = ({ item }) => {
  const router = useRouter();

  const onEditClickHandler = () => router.push(`${routes.EDIT_NEWS}?id=${item.id}`);

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <p>{item.title || 'Нет заголовка'}</p>
      <div>
        <Badge
          onClick={onEditClickHandler}
          className="bg-success badge__link"
          variant="success"
          bg="success"
        >
          Edit
        </Badge>{' '}
        <Badge className="bg-danger badge__link" variant="danger" bg="danger">
          Delete
        </Badge>
      </div>
    </ListGroup.Item>
  );
};

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const data = await getAllNewsRequest();
      if (data) {
        setNews(data);
      }
    };
    getAllNews();
  }, []);

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
            {news.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </ListGroup>
        </Row>
      </Container>
    </Layout>
  );
};

export default News;
