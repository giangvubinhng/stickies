import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoadingOverlay } from '@/components/LoadingOverlay';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = (url: string) => {
      if (url === "/stickies") {
        setIsLoading(true);

      }
    };

    const end = (url: string) => {
      if (url === "/stickies") {
        setIsLoading(false);
      }
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      {isLoading ? (<LoadingOverlay size={35} />) : (
        <div className="bg-lightBackground min-h-screen dark:bg-darkBackground">
          <Navbar />
          <Component {...pageProps} />
        </div>
      )}
    </SessionProvider>
  )
}

export default MyApp
