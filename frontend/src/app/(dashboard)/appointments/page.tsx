import Link from 'next/link';
import styles from './page.module.css';

export default function AppointmentsPage() {
  // Mock data for the UI
  const appointments = [
    { id: 1, clientName: 'Alice Johnson', service: 'Consulting', date: '2026-05-12', time: '10:00 AM', status: 'CONFIRMED' },
    { id: 2, clientName: 'Bob Smith', service: 'Strategy Review', date: '2026-05-12', time: '02:00 PM', status: 'PENDING' },
    { id: 3, clientName: 'Charlie Davis', service: 'Financial Audit', date: '2026-05-13', time: '11:30 AM', status: 'CANCELLED' },
    { id: 4, clientName: 'Diana Prince', service: 'Consulting', date: '2026-05-14', time: '09:00 AM', status: 'CONFIRMED' },
  ];

  const getStatusClass = (status: string) => {
    switch(status) {
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
          <button className="btn-primary">
            + New Appointment
          </button>
        </Link>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchGroup}>
          <input type="text" placeholder="Search client name..." className={styles.searchInput} />
        </div>
        <div className={styles.filterGroup}>
          <select className={styles.selectInput}>
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
            {appointments.map((apt) => (
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
