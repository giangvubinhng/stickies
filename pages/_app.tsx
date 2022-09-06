import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <div className="bg-lightBackground min-h-screen dark:bg-darkBackground">
        <Component {...pageProps} />
      </div>
    )
}

export default MyApp
