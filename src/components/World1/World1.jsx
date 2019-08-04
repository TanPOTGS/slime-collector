import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './World1.module.css';

const World1 = () => (
	<div className={styles.World1Container}>
		<NavLink 
		exact 
		to='/harvest' 
		className={styles.BackToHarvestPage} 
		>
			<span className={styles.Close}>&times;</span>
		</NavLink>
		<div className={styles.World1}>
			
		</div>
	</div>
)

export default World1;