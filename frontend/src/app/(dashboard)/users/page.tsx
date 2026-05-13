import Link from 'next/link';
import styles from './page.module.css';

export default function UsersPage() {
  // Mock data
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@akrsmart.com', role: 'ADMIN', lastActive: '2 mins ago' },
    { id: 2, name: 'Sarah Connor', email: 'sarah@akrsmart.com', role: 'AGENT', lastActive: '1 hour ago' },
    { id: 3, name: 'John Doe', email: 'john@akrsmart.com', role: 'AGENT', lastActive: '2 days ago' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>Manage team members and their roles.</p>
        </div>
        <Link href="/users/new">
          <button className="btn-primary">
            + Add User
          </button>
        </Link>
      </div>

      <div className={`glass ${styles.tableContainer}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={styles.userName}>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    {user.name}
                  </div>
                </td>
                <td className={styles.email}>{user.email}</td>
                <td>
                  <span className={`${styles.roleBadge} ${user.role === 'ADMIN' ? styles.roleAdmin : styles.roleAgent}`}>
                    {user.role}
                  </span>
                </td>
                <td className={styles.lastActive}>{user.lastActive}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>✏️</button>
                    <button className={styles.actionBtn}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
