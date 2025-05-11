import React, { PureComponent } from 'react';
import NavBar from '../Navbar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

export class Root extends PureComponent {
  render() {
    return (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    );
  }
}

export default Root;
