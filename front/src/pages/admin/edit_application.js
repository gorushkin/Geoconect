import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { getApplicationRequest, updateApplicationRequest } from '../../api';
import ApplicationEditor from '../../components/Admin/ApplicationEditor';
import 'react-markdown-editor-lite/lib/index.css';
import Layout from '../../components/Admin/Layout';

const EditApplication = () => {
  const [application, setApplication] = useState();

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    const getApplication = async () => {
      const { data: application } = await getApplicationRequest(id);
      if (application) {
        setApplication(application);
      }
    };
    if (id) getApplication();
  }, [id]);

  const onSubmit = (values) => updateApplicationRequest(id, values);

  return (
    <Layout closed>
      <Row>
        <Col>
          <ApplicationEditor data={application} onSubmit={onSubmit} edit />
        </Col>
      </Row>
    </Layout>
  );
};

export default EditApplication;
