import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HarvestPage.module.css';

const HarvestPage = () => (
	<div className={styles.HarvestPage}>

		<nav className={styles.HarvestNavbar}>

			<NavLink 
			exact 
			to='/harvest/world1' 
			className={styles.World1NavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.World1LinkSpan}>World 1</span>
			</NavLink>

			<NavLink 
			exact 
			to='/harvest/world2' 
			className={styles.World2NavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.World2LinkSpan}>World 2</span>
			</NavLink>

			<NavLink 
			exact 
			to='/harvest/world3' 
			className={styles.World3NavLink} 
			activeClassName={styles.NavLinkCurrent}
			>
				<span className={styles.World3LinkSpan}>World 3</span>
			</NavLink>

		</nav>

	</div>
)

export default HarvestPage;