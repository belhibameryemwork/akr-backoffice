import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={`glass ${styles.loginCard}`}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>AKR</div>
          <h1 className={styles.brandName}>Smart Consulting</h1>
        </div>
        
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Please sign in to your account</p>
        
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              className={styles.input} 
              placeholder="admin@akrsmart.com" 
              required 
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              className={styles.input} 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <div className={styles.actions}>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxLabel}>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          
          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
