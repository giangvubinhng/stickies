import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stickies</title>
        <meta name="description" content="Simple, Blazing Fast Sticky Notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Stickies, Simple and Blazing Fast Sticky Notes
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://worldowe.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ©{' '} 2022 Worldowe. All rights reserved.
          {/* <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </a>
      </footer>
    </div>
  )
}

export default Home
