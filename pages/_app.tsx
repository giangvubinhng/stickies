import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="bg-lightBackground min-h-screen dark:bg-darkBackground">
        <Navbar/> 
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
