import Header from '../Admin/Header';

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);
export default Layout;
