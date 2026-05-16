'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import styles from './page.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0 });

  useEffect(() => {
    apiRequest('/stats').then(data => {
      if (data) setStats(data);
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard Overview</h1>
        <p className={styles.subtitle}>Welcome back, here's what's happening today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary-color)' }}>📅</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Appointments</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)' }}>✅</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Confirmed</span>
            <span className={styles.statValue}>{stats.confirmed}</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>⏳</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Pending</span>
            <span className={styles.statValue}>{stats.pending}</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass`}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>❌</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Cancelled</span>
            <span className={styles.statValue}>{stats.cancelled}</span>
          </div>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={`${styles.activityCard} glass`}>
          <p className={styles.emptyState}>
            {stats.total > 0 ? `You have ${stats.total} appointments in the system.` : 'No recent activity to show.'}
          </p>
        </div>
      </div>
    </div>
  );
}