import Footer from '../Footer';
import Head from '../Head';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className="index">
      <Head />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
