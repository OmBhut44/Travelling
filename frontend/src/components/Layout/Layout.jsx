import React from 'react';
import { useLocation } from 'react-router-dom';
import DefaultHeader from './../Header/Header';
import AdminHeader from './../../admin/Header'; // Assuming you have this in the /admin folder
import DefaultFooter from './../Footer/Footer';
import AdminFooter from './../../admin/Footer'; // Assuming you have this in the /admin folder
import Routers from '../../router/Routers';

const Layout = () => {
  const location = useLocation();

  // Check if the current path starts with '/admin'
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render Header based on path */}
      {isAdminPath ? <AdminHeader /> : <DefaultHeader />}
      
      <Routers />
      
      {/* Conditionally render Footer based on path */}
      {isAdminPath ? <AdminFooter /> : <DefaultFooter />}
    </>
  );
}

export default Layout;
