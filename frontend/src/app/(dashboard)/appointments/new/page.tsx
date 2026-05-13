import Link from 'next/link';
import styles from './new.module.css';

export default function NewAppointmentPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>New Appointment</h1>
          <p className={styles.subtitle}>Schedule a new meeting.</p>
        </div>
        <Link href="/appointments" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>

      <div className={`glass ${styles.formCard}`}>
        <form className={styles.form}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Client Name *</label>
              <input type="text" className={styles.input} required placeholder="Jane Doe" />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" className={styles.input} required placeholder="jane@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="tel" className={styles.input} placeholder="+1 (555) 000-0000" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Service Type *</label>
              <select className={styles.select} required defaultValue="">
                <option value="" disabled>Select a service...</option>
                <option value="Consulting">Consulting</option>
                <option value="Strategy Review">Strategy Review</option>
                <option value="Financial Audit">Financial Audit</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Date *</label>
              <input type="date" className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Time *</label>
              <input type="time" className={styles.input} required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Additional Notes</label>
            <textarea className={styles.textarea} rows={4} placeholder="Any special requirements..."></textarea>
          </div>

          <div className={styles.formActions}>
            <Link href="/appointments">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Save Appointment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
