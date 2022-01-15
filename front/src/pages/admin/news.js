import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, ListGroup } from 'react-bootstrap';

import { getAllNewsRequestCSR } from '../../api';
import { PATH_ROUTES } from '../../api';
import Layout from '../../components/Admin/Layout';

const NewsItem = ({ item }) => {
  const router = useRouter();

  const onEditClickHandler = () => router.push(`${PATH_ROUTES.NEWS_EDIT}?id=${item.id}`);

  return (
    <ListGroup.Item
      onClick={onEditClickHandler}
      action
      className="d-flex justify-content-between align-items-start"
    >
      <p>{item.title || 'Нет заголовка'}</p>
    </ListGroup.Item>
  );
};

// TODO:  Если не получится получить новости, то вывести сообщение о том, что не удалось это сделать

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getAllNews = async () => {
      const { data } = await getAllNewsRequestCSR();
      setNews(data);
    };

    getAllNews();
  }, []);

  return (
    <Layout title="AllNews" closed>
      <Container>
        <Row className="justify-content-center">
          <ListGroup>
            {news?.map((item) => (
              <NewsItem key={item.id} item={item} />
            ))}
          </ListGroup>
        </Row>
      </Container>
    </Layout>
  );
};

export default News;
