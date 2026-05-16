'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from '../../new/new.module.css'; // Reuse styles from new page

export default function EditAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    status: 'PENDING'
  });

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await apiRequest(`/appointments/${id}`);
        if (data) {
          setFormData({
            clientName: data.clientName || '',
            email: data.email || '',
            phone: data.phone || '',
            service: data.service || '',
            date: data.date || '',
            time: data.time || '',
            notes: data.notes || '',
            status: data.status || 'PENDING'
          });
        }
      } catch (err) {
        console.error('Failed to fetch appointment', err);
        setError('Failed to load appointment details');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest(`/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      router.push('/appointments');
    } catch (err: any) {
      console.error('Failed to update appointment', err);
      setError(err.message || 'Failed to update appointment. Please check your inputs and try again.');
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Edit Appointment</h1>
          <p className={styles.subtitle}>Update existing meeting details.</p>
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
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} className={styles.input} required />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
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

            <div className={styles.inputGroup}>
              <label className={styles.label}>Status *</label>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select} required>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Additional Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className={styles.textarea} rows={4}></textarea>
          </div>

          <div className={styles.formActions}>
            <Link href="/appointments">
              <button type="button" className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className="btn-primary">Update Appointment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
