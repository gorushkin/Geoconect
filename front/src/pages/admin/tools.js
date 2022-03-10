import Link from 'next/link';
import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

import { makeImagesBackupRequest, makeDBBackupRequest } from '../../api';
import Layout from '../../components/Admin/Layout';

// const dowunloadFile = (data) => {
//   const blob = new Blob([data], { type: 'type' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'filename.zip';
//   a.click();
// };

const onImagesBackupClickHandler = async () => {
  const { data } = await makeImagesBackupRequest();
  console.log('data: ', data);
};

const onDBBackupClickHandler = async () => {
  const {
    data: { data, message },
  } = await makeDBBackupRequest();
};

const Tools = () => (
  <Layout closed title="Tools">
    <Col>
      <ListGroup>
        <ListGroup.Item
          onClick={onImagesBackupClickHandler}
          action
          as="li"
          className="admin__list-item"
        >
          <span>Cделать бекап картинок</span>
          <Badge variant="primary" pill>
            14
            <a
              rel="noreferrer"
              target="_blank"
              href="/files/2022-2-10-15-43-58.zip"
            >
              Home
            </a>
          </Badge>
        </ListGroup.Item>
        <ListGroup.Item
          onClick={onDBBackupClickHandler}
          action
          as="li"
          className=" admin__list-item"
        >
          <span>Сделать бекап базы</span>
          <Badge variant="primary" pill>
            14
          </Badge>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  </Layout>
);

export default Tools;
