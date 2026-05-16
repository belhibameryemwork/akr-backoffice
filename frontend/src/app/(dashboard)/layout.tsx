'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

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
