'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <div className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.open : ''}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className={styles.mainContent}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
