import Head from '../Head';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className='index'>
      <Head />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
