import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useClient } from '../../hooks';
import Layout from '../../components/Admin/Layout';
import LoginForm from '../../components/Admin/LoginForm';
import { useRouter } from 'next/router';

const Admin = () => {
  const isClient = useClient();
  const router = useRouter();

  const {
    user: { isAuthorized },
  } = useSelector((state) => state);

  useEffect(() => {
    if (isAuthorized) router.push('/admin/cms');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  return isClient ? (
    <Layout title='Login'>
      <LoginForm />
    </Layout>
  ) : null;
};

export default Admin;
