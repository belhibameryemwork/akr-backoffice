import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, here's what's happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>
            📅
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Appointments</span>
            <span className={styles.statValue}>156</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>
            ✅
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Confirmed</span>
            <span className={styles.statValue}>89</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            ⏳
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Pending</span>
            <span className={styles.statValue}>42</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
            ❌
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Cancelled</span>
            <span className={styles.statValue}>25</span>
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={`${styles.activityCard} glass`}>
          <p className={styles.emptyState}>No recent activity to show.</p>
        </div>
      </div>
    </div>
  );
}
