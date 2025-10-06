'use client';
import { Footer, Header } from '@/components/common';
import './globals.css';
import GlobalProvider from '@/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
