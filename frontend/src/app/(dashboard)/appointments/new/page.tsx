'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from './new.module.css';

export default function NewAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      router.push('/appointments');
    } catch (err: any) {
      console.error('Failed to create appointment', err);
      setError(err.message || 'Failed to create appointment. Please check your inputs and try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>New Appointment</h1>
          <p className={styles.subtitle}>Schedule a new meeting.</p>
        </div>
        <Link href="/appointments" className={styles.backLink}>
          ← Back to list
        </Link>
      </div>

      <div className={`glass ${styles.formCard}`}>
        {error && <div style={{ color: 'var(--danger)', padding: '1rem', marginBottom: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--border-radius-md)' }}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Client Name *</label>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className={styles.input} required placeholder="Jane Doe" />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required placeholder="jane@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} placeholder="+1 (555) 000-0000" />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Service Type *</label>
              <select name="service" value={formData.service} onChange={handleChange} className={styles.select} required>
                <option value="" disabled>Select a service...</option>
                <option value="Consulting">Consulting</option>
                <option value="Strategy Review">Strategy Review</option>
                <option value="Financial Audit">Financial Audit</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Time *</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} className={styles.input} required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Additional Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className={styles.textarea} rows={4} placeholder="Any special requirements..."></textarea>
          </div>

          <div className={styles.formActions}>
            <Link href="/appointments">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Save Appointment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
