import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../../index.css';

const Layout = ({ children }) => {
  return (
    <div className='inner'>
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
