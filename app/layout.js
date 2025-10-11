'use client';
import './globals.css';
import GlobalProvider from '@/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children} <ToastContainer />
        </GlobalProvider>
      </body>
    </html>
  );
}
