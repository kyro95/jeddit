import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "remixicon/fonts/remixicon.css";
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {

  return ( 
      <SessionProvider>
        <Component {...pageProps}/>
      </SessionProvider> 
    );
}

export default MyApp
