import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Template with Chatbot</title>
        <meta name="description" content="Next.js template with a simple chatbot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Next.js with Chatbot! dude
        </h1>
        <Chatbot />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}