import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './World3.module.css';

const World3 = () => (
	<div className={styles.World3Container}>
		<NavLink 
		exact 
		to='/harvest' 
		className={styles.BackToHarvestPage} 
		>
			<span className={styles.Close}>&times;</span>
		</NavLink>
		<div className={styles.World3}>
			
		</div>
	</div>
)

export default World3;