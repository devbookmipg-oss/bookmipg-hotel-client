'use client';

import { Typography } from '@mui/material';

// custom components
import { Footer, Header } from '@/components/common';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
