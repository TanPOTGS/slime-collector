import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => (
  <div className={styles.LoginPage}>
		<NavLink exact to='/' className={styles.HomeNavLink}>
			<span className={styles.Close}>&times;</span>
		</NavLink>
    <h1>Login Here</h1>
  </div>
)

export default LoginPage;