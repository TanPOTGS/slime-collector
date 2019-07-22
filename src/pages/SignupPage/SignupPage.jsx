import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SignupPage.module.css';

const SignupPage = () => (
  <div className={styles.SignupPage}>
		<NavLink exact to='/' className={styles.HomeNavLink}>
			<span className={styles.Close}>&times;</span>
		</NavLink>
		<h1>Signup Here</h1>
  </div>
)

export default SignupPage;