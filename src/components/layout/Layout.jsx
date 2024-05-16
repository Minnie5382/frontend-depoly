import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import '../../index.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='inner'>
        <>{children}</>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
