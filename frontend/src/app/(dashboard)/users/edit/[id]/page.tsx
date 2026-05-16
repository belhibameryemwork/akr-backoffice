'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from '../../new/new.module.css';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'AGENT',
    password: '' // Optional for update
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiRequest(`/users/${id}`);
        if (data) {
          setFormData({
            name: data.name || '',
            email: data.email || '',
            role: data.role || 'AGENT',
            password: '' // Keep empty to not update unless typed
          });
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        alert('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      // Only include password if it was filled out
      if (formData.password) {
        payload.password = formData.password;
      }
      
      await apiRequest(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      router.push('/users');
    } catch (error) {
      console.error('Failed to update user', error);
      alert('Failed to update user');
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit User</h1>
          <p className={styles.subtitle}>Update team member details.</p>
        </div>
        <Link href="/users" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>

      <div className={`glass ${styles.formCard}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} className={styles.select} required>
                <option value="AGENT">Agent</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="Leave blank to keep unchanged" />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/users">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
