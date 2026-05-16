'use client';
import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import styles from './page.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, cancelled: 0, recentActivity: [] as any[] });

  const confirmedPercent = stats.total > 0 ? (stats.confirmed / stats.total) * 100 : 0;
  const pendingPercent = stats.total > 0 ? (stats.pending / stats.total) * 100 : 0;
  const cancelledPercent = stats.total > 0 ? (stats.cancelled / stats.total) * 100 : 0;

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


      <div className={styles.bottomGrid}>
        <div className={`glass ${styles.chartCard}`}>
          <h2 className={styles.sectionTitle}>Status Distribution</h2>
          <div className={styles.graphContainer}>
            <div className={styles.graphBar}>
              <div className={styles.segmentConfirmed} style={{ width: `${confirmedPercent}%` }} title={`Confirmed: ${stats.confirmed}`}></div>
              <div className={styles.segmentPending} style={{ width: `${pendingPercent}%` }} title={`Pending: ${stats.pending}`}></div>
              <div className={styles.segmentCancelled} style={{ width: `${cancelledPercent}%` }} title={`Cancelled: ${stats.cancelled}`}></div>
            </div>
            <div className={styles.graphLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--success)' }}></span>
                <span>Confirmed ({Math.round(confirmedPercent)}%)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--warning)' }}></span>
                <span>Pending ({Math.round(pendingPercent)}%)</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} style={{ backgroundColor: 'var(--danger)' }}></span>
                <span>Cancelled ({Math.round(cancelledPercent)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`glass ${styles.activityCard}`}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className={styles.activityList}>
              {stats.recentActivity.map((apt: any) => (
                <div key={apt.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    {apt.status === 'CONFIRMED' ? '✅' : apt.status === 'PENDING' ? '⏳' : '❌'}
                  </div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>
                      <strong>{apt.clientName}</strong> booked <em>{apt.service}</em>
                    </div>
                    <div className={styles.activityTime}>{apt.date} at {apt.time}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>No recent activity to show.</p>
          )}
        </div>
      </div>

    </div>
  );
}