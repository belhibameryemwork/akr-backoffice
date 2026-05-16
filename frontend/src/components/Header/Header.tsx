'use client';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          ☰
        </button>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search appointments, users..." 
            className={styles.searchInput} 
          />
        </div>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.notificationBtn}>
          🔔
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            {user ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user ? user.name : 'Admin User'}</span>
            <span className={styles.userRole}>{user ? user.role : 'Administrator'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
