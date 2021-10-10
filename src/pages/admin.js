import { useSelector } from 'react-redux';
import CMS from '../components/Admin/CMS'
import CMSPage from '../components/Pages/LoginPage'

const Admin = () => {
  const { user: { isAuthorized } } = useSelector(state => state);

  return (
    <>
      {isAuthorized ? <CMS /> : <CMSPage />}
    </>
  );
};

export default Admin;
