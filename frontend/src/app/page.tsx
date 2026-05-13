import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={`glass ${styles.heroCard}`}>
        <h1 className={styles.title}>AKR Smart Consulting</h1>
        <p className={styles.subtitle}>Back-Office Management Portal</p>
        <Link href="/login">
          <button className="btn-primary">Login to Dashboard</button>
        </Link>
      </div>
    </main>
  );
}
