import React from 'react';
import { NavLink } from 'react-router-dom';
import MainWindow from '../../components/MainWindow/MainWindow';
import styles from './HomePage.module.css';

const HomePage = (props) => {
	
	let nav = props.player ?
	<nav className={styles.MainNavbarLoggedIn}>

		<NavLink 
		exact 
		to='/howto' 
		className={styles.HowtoNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.HowToPlayLinkSpan}>How To Play</span>
		</NavLink>

		<NavLink 
		exact 
		to='/harvest' 
		className={styles.HarvestNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.HarvestLinkSpan}>Harvest</span>
		</NavLink>

		<NavLink 
		exact 
		to='/trader' 
		className={styles.TraderNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.TraderLinkSpan}>Trader</span>
		</NavLink>

		<NavLink 
		exact 
		to='/' 
		className={styles.LogoutNavLink} 
		onClick={props.handleLogout}
		>
			<span className={styles.LogoutLinkSpan}>Logout</span>
		</NavLink>

	</nav>
	:
	<nav className={styles.MainNavbarLoggedOut}>

		<NavLink 
		exact 
		to='/howto' 
		className={styles.HowtoNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.HowToPlayLinkSpan}>How To Play</span>
		</NavLink>

		<NavLink 
		exact 
		to='/login' 
		className={styles.LoginNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.LoginLinkSpan}>Continue</span>
		</NavLink>

		<NavLink
		exact 
		to='/signup' 
		className={styles.SignupNavLink} 
		activeClassName={styles.NavLinkCurrent}
		>
			<span className={styles.SignupLinkSpan}>New Game</span>
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