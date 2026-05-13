import styles from './Header.module.css';

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
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
          <div className={styles.avatar}>A</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
