'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>('AGENT');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoInfo}>
          <div className={styles.logo}>AKR</div>
          <span className={styles.brandName}>Smart Consulting</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`} onClick={onClose}>
              <span className={styles.icon}>📊</span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/appointments" className={styles.navItem} onClick={onClose}>
              <span className={styles.icon}>📅</span>
              Appointments
            </Link>
          </li>
          {userRole === 'ADMIN' && (
            <li>
              <Link href="/users" className={styles.navItem} onClick={onClose}>
                <span className={styles.icon}>👥</span>
                Users
              </Link>
            </li>
          )}
        </ul>
      </nav>
      
      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span className={styles.icon}>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
