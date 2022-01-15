import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Row, ListGroup, Table } from 'react-bootstrap';

import { getAllApplicationsRequest } from '../../api';
import { PATH_ROUTES } from '../../api';
import Layout from '../../components/Admin/Layout';

const ApplicationItem = ({ item }) => {
  const router = useRouter();

  const onEditClickHandler = () => router.push(`${PATH_ROUTES.APPLICATION_EDIT}?id=${item.id}`);

  return (
    <tr className="applications__table-row" onClick={onEditClickHandler}>
      <td>{item.id}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.title || 'Нет данных'}</td>
      <td></td>
    </tr>
  );
};

// TODO:  Если не получится получить новости, то вывести сообщение о том, что не удалось это сделать

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getAllApplications = async () => {
      const { data } = await getAllApplicationsRequest();
      if (data) {
        setApplications(data);
      }
    };

    getAllApplications();
  }, []);

  return (
    <Layout title="Applications" closed>
      <Container>
        <Row className="justify-content-center">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((item) => (
                <ApplicationItem key={item.id} item={item} />
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Layout>
  );
};

export default Applications;
