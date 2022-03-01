import { Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';

import { makeImagesBackupRequest, makeDBBackupRequest } from '../../api';
import Layout from '../../components/Admin/Layout';

const onImagesBackupClickHandler = async () => {
  const response = await makeImagesBackupRequest();
  console.log('response: ', response);
};

const onDBBackupClickHandler = async () => {
  const response = await makeDBBackupRequest();
  console.log('response: ', response);
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
