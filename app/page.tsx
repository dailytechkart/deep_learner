import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>app/page.tsx</code>
      </p>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Learn &rarr;</h2>
          <p>Learn about Next.js in an interactive course with quizzes!</p>
        </a>
      </div>
    </main>
  );
} 