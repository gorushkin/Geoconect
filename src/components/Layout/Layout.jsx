import Head from '../Head';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Head />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
