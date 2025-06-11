import React from 'react';
import NavbarMain from '../Components/NavbarMain';
import BodyMain from '../Components/BodyMain';
import Subbody from '../Components/Subbody';
import Footer from '../Components/Footer';
import Subfooter from '../Components/Subfooter';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <div>
      {message && <p className="alert alert-success">{message}</p>}
      <NavbarMain />
      <BodyMain />
      <Footer></Footer>
      <Subfooter />
    </div>
  );
};

export default MainPage;
