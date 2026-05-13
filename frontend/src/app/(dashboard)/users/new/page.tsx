import Link from 'next/link';
import styles from './new.module.css';

export default function NewUserPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Add New User</h1>
          <p className={styles.subtitle}>Create a new account for your team.</p>
        </div>
        <Link href="/users" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>

      <div className={`glass ${styles.formCard}`}>
        <form className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input type="text" className={styles.input} required placeholder="John Doe" />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" className={styles.input} required placeholder="john@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Role *</label>
              <select className={styles.select} required defaultValue="AGENT">
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Temporary Password *</label>
              <input type="password" className={styles.input} required />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/users">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
