import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/clarify-logo.svg"
          alt="Clarify Logo"
          width={180}
          height={37}
          priority
        />
        <h1>Clarify</h1>
      </header>

      <div className={styles.description}>
        <p>
          Welcome to Clarify, your one-stop site for aggregating RSS feeds and blogs.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Replace these with actual blog or RSS feed data */}
        <div className={styles.card}>
          <h2>Blog 1</h2>
          <p>This is a brief description of Blog 1.</p>
        </div>

        <div className={styles.card}>
          <h2>Blog 2</h2>
          <p>This is a brief description of Blog 2.</p>
        </div>

        <div className={styles.card}>
          <h2>RSS Feed 1</h2>
          <p>This is a brief description of RSS Feed 1.</p>
        </div>

        <div className={styles.card}>
          <h2>RSS Feed 2</h2>
          <p>This is a brief description of RSS Feed 2.</p>
        </div>
      </div>
    </main>
  );
}