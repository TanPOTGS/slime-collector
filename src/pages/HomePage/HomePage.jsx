import React from 'react';
import { NavLink } from 'react-router-dom';
import MainWindow from '../../components/MainWindow/MainWindow';
import styles from './HomePage.module.css';

const HomePage = (props) => {
	
	let nav = props.player ?
	<nav className={styles.MainNavbarLoggedIn}>
		<NavLink 
		exact 
		to='/' 
		className={styles.LogoutNavLink} 
		onClick={props.handleLogout}
		>
			<span className={styles.LogoutTitle}>Logout</span>
		</NavLink>

		<NavLink 
		exact 
		to='/howto' 
		className={styles.HowtoNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.HowtoTitle}>How To Play</span>
		</NavLink>
	</nav>
	:
	<nav className={styles.MainNavbarLoggedOut}>
		<NavLink 
		exact 
		to='/login' 
		className={styles.LoginNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.LoginTitle}>Continue</span>
		</NavLink>

		<NavLink
		exact 
		to='/signup' 
		className={styles.SignupNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.SignupTitle}>New Game</span>
		</NavLink>

		<NavLink 
		exact 
		to='/howto' 
		className={styles.HowtoNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.HowtoTitle}>How To Play</span>
		</NavLink>
	</nav>
	;

	return (
		<div className={styles.HomePage}>
			{nav}
			<MainWindow {...props}/>
		</div>
	);
}

export default HomePage;