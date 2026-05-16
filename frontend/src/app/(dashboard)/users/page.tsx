'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from './page.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        if (user.role !== 'ADMIN') {
          router.push('/dashboard');
          return;
        }
      }

      const data = await apiRequest('/users');
      if (data) setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await apiRequest(`/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

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
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : users.map((user) => (
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
                <td className={styles.lastActive}>{user.lastActive || 'N/A'}</td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/users/edit/${user.id}`}>
                      <button className={styles.actionBtn}>✏️</button>
                    </Link>
                    <button className={styles.actionBtn} onClick={() => handleDelete(user.id)}>🗑️</button>
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
