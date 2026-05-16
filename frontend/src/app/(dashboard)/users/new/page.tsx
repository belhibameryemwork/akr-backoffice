'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from './new.module.css';

export default function NewUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'AGENT',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/users', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      router.push('/users');
    } catch (err: any) {
      console.error('Failed to create user', err);
      setError(err.message || 'Failed to create user. Please check your inputs and try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Add New User</h1>
          <p className={styles.subtitle}>Create a new account for your team.</p>
        </div>
        <Link href="/users" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>

      <div className={`glass ${styles.formCard}`}>
        {error && <div style={{ color: 'var(--danger)', padding: '1rem', marginBottom: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--border-radius-md)' }}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required placeholder="John Doe" />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required placeholder="john@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} className={styles.select} required>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Temporary Password *</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/users">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
