'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';
import styles from './page.module.css';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter && statusFilter !== 'ALL') params.append('status', statusFilter);

      const result = await apiRequest(`/appointments?${params.toString()}`);
      if (result && result.data) {
        setAppointments(result.data);
      } else if (Array.isArray(result)) {
        setAppointments(result);
      }
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [searchQuery, statusFilter]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        await apiRequest(`/appointments/${id}`, { method: 'DELETE' });
        fetchAppointments();
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return styles.statusConfirmed;
      case 'PENDING': return styles.statusPending;
      case 'CANCELLED': return styles.statusCancelled;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>Manage your upcoming schedule.</p>
        </div>
        <Link href="/appointments/new">
          <button className="btn-primary">+ New Appointment</button>
        </Link>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchGroup}>
          <input 
            type="text" 
            placeholder="Search client name..." 
            className={styles.searchInput} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <select 
            className={styles.selectInput}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className={`glass ${styles.tableContainer}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading...</td></tr>
            ) : appointments.map((apt: any) => (
              <tr key={apt.id}>
                <td className={styles.clientName}>{apt.clientName}</td>
                <td>{apt.service}</td>
                <td>
                  <div className={styles.dateTime}>
                    <span className={styles.date}>{apt.date}</span>
                    <span className={styles.time}>{apt.time}</span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(apt.status)}`}>
                    {apt.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/appointments/edit/${apt.id}`}>
                      <button className={styles.actionBtn}>✏️</button>
                    </Link>
                    <button className={styles.actionBtn} onClick={() => handleDelete(apt.id)}>🗑️</button>
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